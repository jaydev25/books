import axios from 'axios';
const base_url = 'http://localhost:3000/api';

export const publishBook = async (data: any) => {
  const response: any = await axios({
    method: 'post',
    url: `${base_url}/book/publish`,
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
    method: 'delete',
    url: `${base_url}/book/${bookId}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (response.data) {
    return response.data;
  }
};

export const myBooks = async () => {
  const response: any = await axios({
    method: 'get',
    url: `${base_url}/book/my-books`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (response.data) {
    return response.data;
  }
};

export const searchBooks = async (title: any) => {
  const response: any = await axios({
    method: 'get',
    url: `${base_url}/book/search/?search=${title}`,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  if (response.data) {
    return response.data;
  }
};
