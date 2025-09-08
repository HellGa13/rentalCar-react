import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

export const fetchCars = async (filters = {}, page = 1) => {
  const params = new URLSearchParams({
    ...filters,
    page,
    limit: 12,
  });

  const response = await axios.get(`${BASE_URL}/cars?${params.toString()}`);
  return response.data;
};