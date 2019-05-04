import axios from 'axios';

const url = 'https://developers.overwolf.com/game-events/10906_prod.json';
const instance = axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

type State = 0 | 1 | 2 | 3;
interface OverwolfHealth {
  game_id: number;
  state: State;
  features: {
    name: string;
    state: State;
    keys: {
      name: string;
      type: number;
      state: State;
    }[];
  }[];
}

const getOverwolfHealth = () => {
  return instance
    .get<OverwolfHealth>(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(`${error.message}: ${url}`);
      throw error;
    });
};

export default getOverwolfHealth;
