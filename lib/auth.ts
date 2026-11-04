import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const AUTH_COOKIE = "urbannest_session";
const SESSION_DAYS = 7;

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);
export const createToken = () => randomBytes(32).toString("base64url");

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  return session.user;
}

export async function createSessionForUser(userId: number) {
  const token = createToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS);
  await prisma.session.create({ data: { token, userId, expiresAt } });
  await setSessionCookie(token);
}
