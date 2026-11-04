import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { services as seedServices } from "@/data/services";

export async function GET() {
  const count = await prisma.service.count();

  if (count === 0) {
    await prisma.service.createMany({
      data: seedServices.map((service) => ({
        name: service.name,
        category: service.category,
        description: service.description,
        price: service.price,
        rating: service.rating,
        reviews: service.reviews,
        icon: service.icon,
        duration: service.duration,
      })),
    });
  }

  const rows = await prisma.service.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json(rows);
}
