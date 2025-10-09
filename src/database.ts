import { PrismaClient } from "./generated/prisma";

export const prismaClient = new PrismaClient();

// Graceful shutdown handler
const gracefulShutdown = async () => {
  console.log('Disconnecting from database...');
  await prismaClient.$disconnect();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);