import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.TH_PUBG_API,
  timeout: 5000,
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
      console.error(`${error.message}: ${url}`);
      throw error;
    });
};

export default getTHApi;
