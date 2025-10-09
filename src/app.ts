import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { config } from './config';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';
import protectRoutes from './routes/protected';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error-handler';
dotenv.config();

const app = express();
app.use(cors({
    origin: config.cors.origin,
    credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

const limiter = rateLimit({
    windowMs: 60_000, 
    max: 100
})
app.use(limiter);

//public 
app.use('/api/auth', authRoutes);
app.use('/api', protectRoutes);

// error at last
app.use(errorHandler);

export default app;