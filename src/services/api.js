import axios from 'axios';

const api = axios.create({
  baseURL: 'http://financemanagerces26back.herokuapp.com'
});

export default api;