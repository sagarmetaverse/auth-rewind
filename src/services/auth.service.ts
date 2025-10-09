import { PrismaClient } from "../generated/prisma";
import { LoginDTO, RegisterDTO } from "../types/auth";
import { jwtPayload, JWTUtils } from '../utils/jwt';
import { PasswordUtils } from "../utils/password";

export class AuthService {
    constructor(private prisma: PrismaClient) { }

    async register(dto: RegisterDTO) {
        if (!dto.email || !dto.password) {
            throw new Error("Email and password are required");
        }

        try {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    email: dto.email,
                },
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const hashedPassword = await PasswordUtils.hashPassword(dto.password);

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hashedPassword,
                },
            });

            if (!user) {
                throw new Error("User creation failed");
            }

            const payload: jwtPayload = {
                userId: user.id,
                email: user.email,
            };

            return {
                token: JWTUtils.signToken(payload),
                refreshToken: JWTUtils.signRefreshToken(payload),
            };
        } catch (error) {
            throw error;
        }
    }

    async login(dto: LoginDTO) {
        if (!dto.email || !dto.password) {
            throw new Error("Email and password are required");
        }

        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: dto.email,
                },
            });
    
            if (!user) {
                throw new Error("Invalid email or password");
            }
    
            const isPasswordValid = await PasswordUtils.comparePassword(
                dto.password,
                user.passwordHash
            );
    
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }
    
            const payload: jwtPayload = {
                userId: user.id,
                email: user.email,
            };
            return {
                token: JWTUtils.signToken(payload),
                refreshToken: JWTUtils.signRefreshToken(payload),
            };
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(token: string) {
        const jwtPayload = JWTUtils.verifyRefreshToken(token);

        if (!jwtPayload || !jwtPayload.userId) {
            throw new Error("Invalid refresh token");
        }

        try {
            const user = await this.prisma.user.findUnique({
                where: { id: jwtPayload.userId },
            });
    
    
            if (!user) {
                throw new Error("User not found");
            }
    
    
            const payload: jwtPayload = {
                userId: user.id,
                email: user.email,
            };
    
            return {
                token: JWTUtils.signToken(payload),
                refreshToken: JWTUtils.signRefreshToken(payload),
            };
        } catch (error) {
            throw error;
        }
    }
}
