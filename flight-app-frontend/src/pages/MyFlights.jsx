import React, { useEffect, useState } from "react";
import Header from "../components/MyFlights/Header";
import MyFlightsCard from "../components/MyFlights/MyFlightsCard";
import { getMyFlight } from "../API/getMyFlight";
import { IoIosInformationCircleOutline } from "react-icons/io";

const MyFlights = () => {
  const [myFlights, setmyFlights] = useState([]); // Uçuş verilerini tutmak için durum
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightData = await getMyFlight(); // Uçuş verilerini al
        setmyFlights(flightData); // Durumu güncelle
      } catch (err) {
        setError("An error occurred while retrieving flight data."); // Hata mesajı
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchFlights(); // Uçuşları çek
  }, []);
  return (
    <div className="bg-[#318AFB] pt-8 pr-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-lg">Loading...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      ) : (
        <div className="bg-[#F4F4F5] rounded-t-lg">
          <Header />
          <div className="flex justify-between mx-10 my-6">
            <div>
              <p>
                Sort by:{" "}
                <select className="bg-[#F4F4F5] font-bold rounded mt-1 text-sm">
                  <option>Recommended</option>
                </select>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-blue-600">
                <IoIosInformationCircleOutline size={20} />
              </span>
              <p className="ml-2">Avg Fare: $225</p>
            </div>
          </div>
          <MyFlightsCard myFlights={myFlights} />
        </div>
      )}
    </div>
  );
};

export default MyFlights;
