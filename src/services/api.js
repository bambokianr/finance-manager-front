import axios from 'axios';

const api = axios.create({
  // withCredentials: true,
  baseURL: 'http://financemanagerces26back.herokuapp.com',
  // baseURL: 'http://localhost:3333'
});

export default api;