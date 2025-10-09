import { Request, Response, NextFunction } from 'express';
import { JWTUtils } from '../utils/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        next(new Error('Authorization header missing'));
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        next(new Error('Token missing'));
        return;
    }

    try {
        const decoded = JWTUtils.verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}
