import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});
export const publicUrl = process.env.PUBLIC_URL;