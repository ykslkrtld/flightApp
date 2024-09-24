import axios from 'axios';

export const getFlights = async (departureDate, selectedDepartureAirport, selectedArrivalAirport) => {
  try {
      if(departureDate, selectedDepartureAirport, selectedArrivalAirport){
      const { data } = await axios.get(`http://localhost:8000/flights?departureDate=${departureDate}&arrival=${selectedArrivalAirport}&departure=${selectedDepartureAirport}` );
      return data.data;
      } else {
        const { data } = await axios.get('http://localhost:8000/flights');
        return data.data;
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      throw error;
    }
  }
