import axios from 'axios';

export const searchSongs = async (query) => {
  const response = await axios.get(`https://corsproxy.io/?https://api.deezer.com/search?q=${query}`);
  return response.data.data;  
};
