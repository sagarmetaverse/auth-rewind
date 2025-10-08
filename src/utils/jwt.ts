import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";

export interface jwtPayload {
  userId: string;
  email?: string;
}

export class JWTUtils {
  signToken(payload: jwtPayload): string {
    if (!config.jwt.secret) {
      throw new Error("JWT secret is not configured");
    }
    const options: SignOptions = {
      expiresIn: config.jwt.expiresIn || ("1h" as any),
    };
    return jwt.sign(payload, config.jwt.secret, options);
  }

  verifyToken(token: string): jwtPayload {
    if (!config.jwt.secret) {
      throw new Error("JWT secret is not configured");
    }
    return jwt.verify(token, config.jwt.secret) as jwtPayload;
  }

  signRefreshToken(payload: jwtPayload): string {
    if (!config.jwt.refreshSecret) {
      throw new Error("Refresh token secret is not configured");
    }

    const options: SignOptions = {
      expiresIn: config.jwt.refreshExpiresIn || ("7d" as any),
    };

    return jwt.sign(payload, config.jwt.refreshSecret, options);
  }

  verifyRefreshToken(token: string): jwtPayload {
    if (!config.jwt.refreshSecret) {
      throw new Error("Refresh token secret is not configured");
    }
    return jwt.verify(token, config.jwt.refreshSecret) as jwtPayload;
  }
}
