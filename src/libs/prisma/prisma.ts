import { PrismaClient } from "@prisma/client";

const env = process.env.ENV;

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;
