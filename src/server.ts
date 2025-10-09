import { config } from "./config";
import app from "./app";
import { PrismaClient } from "./generated/prisma";

export const prismaClient = new PrismaClient();

app.listen(config.port, () => {
  console.log(`🚀 Server listening on http://localhost:${config.port}`);
});
