import { Router } from 'express';
import {
  getBookById,
  getBooksByTitle,
  getMyBooks,
  publishBook,
  unPublishBook,
} from './book.controller';

export const bookRoutes = Router();

bookRoutes.post('/publish', publishBook);
bookRoutes.get('/user', getMyBooks);
bookRoutes.get('/search/', getBooksByTitle);
bookRoutes.put('/unpublish/:bookId', unPublishBook);
