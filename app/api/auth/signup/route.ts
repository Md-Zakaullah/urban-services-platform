import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSessionForUser, hashPassword } from "@/lib/auth";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check your name, email, and password (8–72 characters)." }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
    if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });

    const user = await prisma.user.create({
      data: { name: parsed.data.name, email: parsed.data.email, password: await hashPassword(parsed.data.password) },
      select: { id: true, name: true, email: true, role: true },
    });
    await createSessionForUser(user.id);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Signup failed", error);
    return NextResponse.json({ error: "Could not create account. Please try again." }, { status: 500 });
  }
}
