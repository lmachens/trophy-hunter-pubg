import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.TH_PUBG_API || 'https://pubg-api.th.gl',
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const getTHApi = <T>(url: string) => {
  return instance
    .get<T>(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      error.message = `${error.message}: ${url}`;
      throw error;
    });
};

export default getTHApi;
