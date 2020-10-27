import axios from 'axios';

export const weatherAxios = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/'
});

const insctance = axios.create({
      baseURL: 'https://exmoto.md/api/v1'
});

export default insctance;