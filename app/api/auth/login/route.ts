import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSessionForUser, verifyPassword } from "@/lib/auth";

const schema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user || !(await verifyPassword(parsed.data.password, user.password))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSessionForUser(user.id);
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "Could not log in right now. Please try again." }, { status: 500 });
  }
}
