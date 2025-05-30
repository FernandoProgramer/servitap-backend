import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.roles.upsert({
        where: { role: "KITCHEN" },
        update: {},
        create: { role: "KITCHEN" },
    });
    await prisma.roles.upsert({
        where: { role: "WAITER" },
        update: {},
        create: { role: "WAITER" },
    });
    await prisma.roles.upsert({
        where: { role: "CASHIER" },
        update: {},
        create: { role: "CASHIER" },
    });
    await prisma.roles.upsert({
        where: { role: "ADMIN" },
        update: {},
        create: { role: "ADMIN" },
    });
    await prisma.roles.upsert({
        where: { role: "SUPERADMIN" },
        update: {},
        create: { role: "SUPERADMIN" },
    });

}

(async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})()