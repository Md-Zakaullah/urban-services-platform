import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [totalProviders, totalBookings, revenue, recentBookings] = await Promise.all([
    prisma.user.count({ where: { role: "provider" } }),
    prisma.booking.count(),
    prisma.booking.aggregate({ _sum: { amount: true } }),
    prisma.booking.findMany({ take: 10, include: { user: true, service: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({
    totalProviders,
    totalBookings,
    revenue: revenue._sum.amount ?? 0,
    recentBookings: recentBookings.map((booking) => ({ id: booking.id, service: booking.service.name, customer: booking.contactName, status: booking.status, date: booking.date, amount: booking.amount })),
  });
}
