import { config } from "./config";
import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Attach prisma to app.locals for easy access in services
app.locals.prisma = prisma;

app.listen(config.port, () => {
  console.log(`🚀 Server listening on http://localhost:${config.port}`);
});
