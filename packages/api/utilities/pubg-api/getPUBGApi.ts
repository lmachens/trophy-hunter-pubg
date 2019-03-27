import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.pubg.com/shards/',
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + process.env.PUBG_API_KEY,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

interface GetPUBGApiProps {
  platform: string;
  endpoint: string;
}

const getPUBGApi = <T>({ platform, endpoint }: GetPUBGApiProps) => {
  const url = `/${platform.toLowerCase()}/${endpoint}`;
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

export default getPUBGApi;
