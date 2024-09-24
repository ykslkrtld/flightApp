import axios from 'axios';

export const getMyFlight = async () => {
  try {
    const { data } = await axios.get('https://flight-app-vert.vercel.app/myFlight');
    return data.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};