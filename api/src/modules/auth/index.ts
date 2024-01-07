import express from 'express';
import { authRoutes } from './auth.route';
import jwt from 'jsonwebtoken';
import config from './../../config/config';

export const authRouter = express.Router();

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwt.secret);
    const userId = decodedToken.userId;

    if (userId) {
      req.user = decodedToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

authRouter.use(authRoutes);
