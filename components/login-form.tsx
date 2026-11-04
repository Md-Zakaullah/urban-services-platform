import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await requireUser();
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const [totalProviders, totalBookings, revenue] = await Promise.all([
      prisma.user.count({ where: { role: "provider" } }),
      prisma.booking.count(),
      prisma.booking.aggregate({ _sum: { amount: true } }),
    ]);

    return NextResponse.json({
      totalProviders,
      totalBookings,
      revenue: revenue._sum.amount ?? 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
