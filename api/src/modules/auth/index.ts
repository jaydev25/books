import express from 'express';
import { authRoutes } from './auth.route';

export const authRouter = express.Router();

authRouter.use(authRoutes);