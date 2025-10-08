import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
    refreshSecret: process.env.REFRESH_TOKEN_SECRET ?? "",
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "7d",
  },
  cors: {
    origin: process.env.CORS_ORIGIN ?? "*",
  },
  db: {
    url: process.env.DATABASE_URL,
  },
};
