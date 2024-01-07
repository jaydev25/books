import bookModel from 'api/src/models/book.model';

export const createBook = async (data) => {
  try {
    const book = await bookModel.create(data);

    return { data: book };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const deleteBook = async (bookId) => {
  try {
    const book = await bookModel.deleteOne({ _id: bookId });

    return { data: book };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const findBooksByUser = async (userId) => {
  try {
    const books = await bookModel.find({ 'author.userId': userId });

    return { data: books };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const findBookById = async (bookId) => {
  try {
    const books = await bookModel.find({ _id: bookId });

    return { data: books };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const findBooksByTitle = async (title) => {
  try {
    let regex = new RegExp(title, 'i');

    const books = await bookModel.find({ title: regex });

    return { data: books };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
