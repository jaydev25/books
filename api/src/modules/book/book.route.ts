import { Router } from 'express';
import { getBookById, getBooksByTitle, getMyBooks, publishBook, unPublishBook } from './book.controller';

export const bookRoutes = Router();

bookRoutes.post('/publish', publishBook);
bookRoutes.get('/my-books', getMyBooks);
bookRoutes.delete('/:bookId', unPublishBook);
bookRoutes.get('/:bookId', getBookById);
bookRoutes.get('/search/:title', getBooksByTitle);
