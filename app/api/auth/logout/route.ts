import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, clearSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { token } });
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
