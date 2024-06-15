import axios from 'axios';

export const searchSongs = async (query) => {
  const response = await axios.get(`/api/deezer/search?q=${query}`);
  return response.data.data;  
};
