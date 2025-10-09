import { config } from "./config";
import app from "./app";
import { prismaClient } from "./database";

async function startServer() {
  try {
    // Test database connection
    await prismaClient.$connect();
    console.log("✅ Database connected successfully");

    app.listen(config.port, () => {
      console.log(`🚀 Server listening on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
