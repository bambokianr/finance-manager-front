import axios from 'axios';

const DEV = 'http://localhost:3333';
const PROD = 'https://financemanagerces26back.herokuapp.com';

const api = axios.create({
  baseURL: PROD,
});

export default api;