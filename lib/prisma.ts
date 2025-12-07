import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in environment variables");
  throw new Error("DATABASE_URL must be defined");
}

let adapter;
try {
  adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
} catch (error) {
  console.error("Failed to create Prisma adapter:", error);
  throw error;
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "production"
        ? ["error", "warn"]
        : ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Test connection on initialization
prisma.$connect().catch((error) => {
  console.error("Failed to connect to database:", error);
  console.error(
    "DATABASE_URL:",
    process.env.DATABASE_URL ? "Set (hidden)" : "Not set",
  );
});

export default prisma;
