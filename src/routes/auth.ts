import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { Register } from "ts-node";
import { LoginDTO, RegisterDTO } from "../types/auth";
import router from "./protected";
import { prismaClient } from "../server";

const authRoutes = Router();

const authService = new AuthService(prismaClient);

authRoutes.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const dto: LoginDTO = {
        email,
        password
    }

    try {
        const user = await authService.login(dto);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
});


authRoutes.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    const dto: RegisterDTO = {
        email,
        password
    }

    try {
        const user = await authService.register(dto);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        next(error)
    }
});

router.post("/refresh-token", async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
        const newTokens = await authService.refreshToken(refreshToken);
        res.status(200).json(newTokens);
    } catch (error) {
        next(error)
    }
});

export default authRoutes;