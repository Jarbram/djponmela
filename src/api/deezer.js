import axios from 'axios';

export const searchSongs = async (query) => {
  const response = await axios.get(`https://crossorigin.me/?https://api.deezer.com/search?q=${query}`);
  return response.data.data;  
};
