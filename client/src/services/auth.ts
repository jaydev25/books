import axios from 'axios';
const base_url = 'http://localhost:3000/api';

export const signup = async (data: any) => {
  const response = await axios.post(`${base_url}/signup`, data);
  if (response.data) {
    return response.data;
  }
};

export const login = async (data: any) => {
  const response: any = await axios.post(`${base_url}/login`, data);

  if (response.data) {
    return response.data;
  }
};
