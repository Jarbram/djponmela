import axios from 'axios';


export const searchSongs = async (query) => {
  try {
    const response = await axios.get(`/api/search?q=${query}`);
    return response.data.data;
  } catch (error) {
    console.error('Error searching songs:', error);
    throw error;
  }
};
