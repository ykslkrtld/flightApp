import React from "react";
import airlineLogos from "../../helper/AirlineLogo.json"; // Havayolu logolarını içe aktar

const MyFlightsCard = ({ myFlights }) => {
  return (
    <>
      {myFlights.map((myFlight) => {
        // Havayolu logosunu bul; bulunamazsa varsayılan olarak Türk Hava Yolları logosunu kullan
        const airlineLogo =
          airlineLogos.find((logo) => logo.name === myFlight.airline) ||
          airlineLogos.find((logo) => logo.name === "Turkish Airlines");
        
        return (
          <div
            key={myFlight.flightId}
            className="flex flex-col sm:flex-row my-3 mx-2 sm:mx-4 border-2 bg-white shadow-lg rounded-lg px-4 sm:px-10 py-4"
          >
            <div className="flex-1 flex">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-start mr-4">
                <img
                  src={
                    airlineLogo
                      ? airlineLogo.logo
                      : "URL_TO_TURKISH_AIRLINES_LOGO" // Yedek logo URL'si
                  }
                  alt="Havayolu Logosu"
                  className="w-full h-full rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <div className="text-[1.5rem]">
                  {/* Kalkış ve varış saatlerini formatla ve göster */}
                  {new Date(myFlight.departureDateTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}{" "}
                  -{" "}
                  {new Date(myFlight.arrivalDateTime).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit", hour12: true }
                  )}
                </div>
                <div className="flex flex-wrap mt-2 space-x-20 sm:space-x-4 sm:justify-center">
                  <div>
                    <div className="font-semibold">{myFlight.airline}</div>
                    <select className="text-blue-400 rounded mt-1 text-sm">
                      <option>Flight Details</option>
                    </select>
                  </div>
                  <div>
                    <div className="font-semibold">Nonstop</div>
                    <div className="text-sm">1h 35m</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {myFlight.departureAirport} - {myFlight.arrivalAirport}
                    </div>
                    <div className="text-sm">{myFlight.flightName}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              {/* Farklı sınıflar için fiyat seçenekleri */}
              <div className="w-24 h-30 border border-gray-300 flex flex-col items-center justify-around">
                <div className="text-lg">$ 199</div>
                <div className="text-sm text-center">Economy Class</div>
              </div>
              <div className="w-24 h-30 border border-gray-300 flex flex-col items-center justify-around">
                <div className="text-lg">$ 219</div>
                <div className="text-sm text-center">Premium Economy</div>
              </div>
              <div className="w-24 h-30 border border-gray-300 flex flex-col items-center justify-around">
                <div className="text-lg">$ 249</div>
                <div className="text-sm text-center">Business Class</div>
              </div>
              <div className="w-24 h-30 border border-gray-300 flex flex-col items-center justify-around">
                <div className="text-lg">$ 279</div>
                <div className="text-sm text-center">First Class</div>
              </div>
              <div className="w-24 h-30 border border-gray-300 flex flex-col items-center justify-around">
                <div className="text-lg">$ 299</div>
                <div className="text-sm text-center">Charter Flights</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MyFlightsCard;
