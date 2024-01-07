import { Router } from 'express';
import { login, signup } from './auth.controller';

export const authRoutes = Router();

authRoutes.get('/auth', (req, res) => {
  res.send('Auth');
});

authRoutes.post('/signup', async (req, res) => {
  return signup(req, res);
});

authRoutes.post('/login', (req, res) => {
    return login(req, res);
});
