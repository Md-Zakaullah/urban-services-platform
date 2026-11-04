import { services } from "@/data/services";
import { prisma } from "@/lib/prisma";

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    });
  }
  console.log(`Seeded ${services.length} services`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => prisma.$disconnect());
