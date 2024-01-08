import axios from 'axios';
const base_url = '/api';

export const publishBook = async (data: any) => {
  const response: any = await axios({
    method: 'post',
    url: `${base_url}/books/publish`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    data,
  });

  if (response.data) {
    return response.data;
  }
};

export const unPublishBook = async (bookId: any) => {
  const response: any = await axios({
    method: 'put',
    url: `${base_url}/books/unpublish/${bookId}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (response.data) {
    return response.data;
  }
};

export const myBooks = async (page: any, limit: any) => {
  const response: any = await axios({
    method: 'get',
    url: `${base_url}/books/user/?page=${page}&limit=${limit}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (response.data) {
    return response.data;
  }
};

export const searchBooks = async (title: any, page: any, limit: any) => {
  const response: any = await axios({
    method: 'get',
    url: `${base_url}/books/search/?search=${title}&page=${page}&limit=${limit}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (response.data) {
    return response.data;
  }
};
