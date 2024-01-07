import express from 'express';
import { bookRoutes } from './book.route';

export const bookRouter = express.Router();

bookRouter.use(bookRoutes);
