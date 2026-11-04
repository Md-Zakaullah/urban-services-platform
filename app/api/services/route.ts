import { NextResponse } from "next/server";
import { AUTH_COOKIE, clearSessionCookie, getCurrentUser, prisma } from "@/lib/auth";

export async function POST() {
  const user = await getCurrentUser();

  if (user) {
    const cookieStore = await import("next/headers").then((mod) => mod.cookies());
    const token = cookieStore.get(AUTH_COOKIE)?.value;
    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }
  }

  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
