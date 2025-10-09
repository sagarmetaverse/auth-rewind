import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
    status?: number;
}

export function errorHandler(err: unknown,
    req: Request,
    res: Response,
    next: NextFunction) {
    if (err instanceof Error) {
        const customErr = err as CustomError;
        return res.status(customErr.status || 500).json({ error: customErr.message });
    }

    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
}