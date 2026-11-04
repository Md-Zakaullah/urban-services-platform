import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { services as seedServices } from "@/data/services";

export async function GET() {
  try {
    await Promise.all(seedServices.map((service) => prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        name: service.name,
        category: service.category,
        description: service.description,
        price: service.price,
        rating: service.rating,
        reviews: service.reviews,
        icon: service.icon,
        duration: service.duration,
      },
    })));
    const services = await prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Unable to load services", error);
    return NextResponse.json({ error: "Services are temporarily unavailable." }, { status: 500 });
  }
}
