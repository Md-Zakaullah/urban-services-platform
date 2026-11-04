import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  contactName: z.string().trim().min(2).max(80),
  contactPhone: z.string().trim().min(8).max(24),
  location: z.string().trim().min(5).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1).max(40),
  notes: z.string().trim().max(1000).optional().default(""),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please log in to view bookings." }, { status: 401 });
    const bookings = await prisma.booking.findMany({ where: { userId: user.id }, include: { service: true }, orderBy: { createdAt: "desc" } });
    return NextResponse.json(bookings.map((booking) => ({
      id: booking.id,
      service: booking.service.name,
      location: booking.location,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      price: booking.amount,
    })));
  } catch (error) {
    console.error("Could not load bookings", error);
    return NextResponse.json({ error: "Could not load bookings." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please log in before requesting a booking." }, { status: 401 });
    const parsed = bookingSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check the booking details." }, { status: 400 });

    const service = await prisma.service.findFirst({ where: { id: parsed.data.serviceId, active: true } });
    if (!service) return NextResponse.json({ error: "That service is unavailable." }, { status: 404 });

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        contactName: parsed.data.contactName,
        contactPhone: parsed.data.contactPhone,
        location: parsed.data.location,
        date: parsed.data.date,
        time: parsed.data.time,
        notes: parsed.data.notes,
        amount: service.price,
      },
      select: { id: true, status: true, amount: true },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Could not create booking", error);
    return NextResponse.json({ error: "Could not create booking. Please try again." }, { status: 500 });
  }
}
