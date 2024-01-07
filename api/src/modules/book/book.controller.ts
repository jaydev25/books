import { createBook, deleteBook, findBookById, findBooksByTitle, findBooksByUser } from './book.service';
import Joi from 'joi';

export const publishBook = async (req, res) => {
  const { body } = req;
  const bookSchema = Joi.object().keys({
    title: Joi.string().required(),
    desc: Joi.string().required(),
  });
  const result = bookSchema.validate(body);
  const { error, value } = result;

  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      error: error,
    });
  } else {
    const { data, error } = await createBook({
      ...value,
      author: {
        userId: req.user.userId,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });

    if (error) {
      return res.status(500).json({ error });
    }
    return res.json({ message: 'Book created!', data });
  }
};

export const unPublishBook = async (req, res) => {
    const { params } = req;
    const bookSchema = Joi.object().keys({
      bookId: Joi.string().required(),
    });
    const result = bookSchema.validate(params);
    const { error, value } = result;
  
    const valid = error == null;
    if (!valid) {
      res.status(422).json({
        message: 'Invalid request',
        error: error,
      });
    } else {
      const { data, error } = await deleteBook(value.bookId);
  
      if (error) {
        return res.status(500).json({ error });
      }
      return res.json({ message: 'Book deleted!', data });
    }
};

export const getBookById = async (req, res) => {
    const { params } = req;
    const bookSchema = Joi.object().keys({
      bookId: Joi.string().required(),
    });
    const result = bookSchema.validate(params);
    const { error, value } = result;
  
    const valid = error == null;
    if (!valid) {
      res.status(422).json({
        message: 'Invalid request',
        error: error,
      });
    } else {
      const { data, error } = await findBookById(value.bookId);
  
      if (error) {
        return res.status(500).json({ error });
      }
      return res.json({ message: 'Book found!', data });
    }
};

export const getMyBooks = async (req, res) => {
      const { data, error } = await findBooksByUser(req.user.userId);
  
      if (error) {
        return res.status(500).json({ error });
      }
      return res.json({ message: 'My Books!', data });
};

export const getBooksByTitle = async (req, res) => {
    const { params } = req;
    const bookSchema = Joi.object().keys({
      title: Joi.string().required(),
    });
    const result = bookSchema.validate(params);
    const { error, value } = result;
  
    const valid = error == null;
    if (!valid) {
      res.status(422).json({
        message: 'Invalid request',
        error: error,
      });
    } else {
      const { data, error } = await findBooksByTitle(value.title);
  
      if (error) {
        return res.status(500).json({ error });
      }
      return res.json({ message: 'Books found!', data });
    }
};
