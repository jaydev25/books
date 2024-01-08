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

export const findBooksByUser = async (userId, page, limit) => {
  try {
    const options = {
      page,
      limit,
    };

    const books = await bookModel.paginate({ 'author.userId': userId }, options);

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

export const findBooksByTitle = async (title, page, limit) => {
  try {
    let regex = new RegExp(title, 'i');

    const options = {
      page,
      limit,
    };

    const books = await bookModel.paginate({ title: regex }, options);

    return { data: books };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
