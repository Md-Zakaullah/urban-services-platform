import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const bookingSchema = z.object({
  serviceId: z.coerce.number(),
  location: z.string().min(2),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().optional().default(""),
});

export async function GET() {
  try {
    const user = await requireUser();
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      bookings.map((booking) => ({
        id: booking.id,
        service: booking.service.name,
        location: booking.location,
        date: booking.date,
        time: booking.time,
        notes: booking.notes,
        status: booking.status,
        price: booking.amount,
      }))
    );
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: parsed.data.serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        location: parsed.data.location,
        date: parsed.data.date,
        time: parsed.data.time,
        notes: parsed.data.notes,
        amount: service.price,
        status: "requested",
      },
      include: { service: true },
    });

    return NextResponse.json({
      id: booking.id,
      service: booking.service.name,
      amount: booking.amount,
      status: booking.status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized or bad request" }, { status: 401 });
  }
}
