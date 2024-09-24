import { useEffect, useState } from 'react';
import FlightsCard from '../components/Home/FlightsCard';
import Header from '../components/Home/Header';
import Advert from '../components/Home/Advert';
import FilterFlights from '../components/Home/FilterFlights';
import { getFlights } from '../API/getFlights';

const Home = () => {
  const [flights, setFlights] = useState([]); // Uçuş verilerini tutmak için durum
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu
  const [selectedAirline, setSelectedAirline] = useState(""); // Seçilen havayolu

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightData = await getFlights(); // Uçuş verilerini al
        setFlights(flightData); // Durumu güncelle
      } catch (err) {
        setError('An error occurred while retrieving flight data.'); // Hata mesajı
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchFlights(); // Uçuşları çek
  }, []);

  return (
    <div className="bg-[#E9DEFF] min-h-screen p-4 sm:p-8">
      <div className="bg-[#F6F4F8] rounded-lg p-4 shadow-md flex flex-col">
        <Header />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-lg">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-lg text-red-500">{error}</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            <div className="flex-grow">
              <FilterFlights setFlights={setFlights} setSelectedAirline={setSelectedAirline} />
              <div className="overflow-y-scroll max-h-[500px]">
                <FlightsCard flights={flights} selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} />
              </div>
            </div>

            <div className="w-full md:w-1/5 mt-4 md:mt-0 md:ml-4">
              <Advert />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
