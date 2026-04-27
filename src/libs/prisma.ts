import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  database: "asrildev_real-movie-mania",
});

export const prisma = new PrismaClient({ adapter });