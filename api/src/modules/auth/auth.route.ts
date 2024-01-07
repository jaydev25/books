import { Router } from 'express';
import { login, signup } from './auth.controller';

export const authRoutes = Router();

authRoutes.post('/signup', signup);

authRoutes.post('/login', login);
