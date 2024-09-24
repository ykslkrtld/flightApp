import axios from 'axios';

export const getMyFlight = async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/myFlight');
    return data.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};