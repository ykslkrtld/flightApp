import { FaPlane } from "react-icons/fa";
import { postMyFlight } from "../../API/postMyFlight";
import { useNavigate } from "react-router-dom";
import { toastWarnNotify } from "../../helper/ToastNotify";

const FlightsCard = ({ flights, selectedAirline, setSelectedAirline }) => {
  const navigate = useNavigate();

  const sortOptions = [
    "Lowest Price",
    "Highest Price",
    "Earliest Departure",
    "Latest Departure",
  ];

  const arrivalTimeOptions = ["5:00 AM - 11:59 AM", "12:00 PM - 5:59 PM"];
  const stopOptions = ["Nonstop", "1 Stop", "2+ Stops"];
  const airlines = [...new Set(flights.map((flight) => flight.airline))]; // Benzersiz havayollarını al

  const handlePost = async (flight) => {
    // Uçuş rezervasyonu işlemi
    if (flight.departureDateTime) {
      const currentDateTime = new Date();

      if (new Date(flight.departureDateTime) < currentDateTime) {
        toastWarnNotify("Reservations for past dates cannot be made.");
        return;
      } // Eski tarihli rezervasyon yapılamaz
      try {
        await postMyFlight(flight);
        navigate("/my-flights"); // Uçuşlarım sayfasına yönlendir
      } catch (error) {
        if (error.response && error.response.data) {
          toastWarnNotify(
            error.response.data.message ||
              "Rezervasyon oluşturulurken bir hata oluştu"
          );
        } else {
          console.error("Rezervasyon oluşturulurken bir hata oluştu", error);
          alert("Bir hata oluştu, lütfen tekrar deneyin.");
        }
      }
    }
  };

  // Havayolu seçildiğinde çağrılan fonksiyon
  const handleAirlineChange = (e) => {
    setSelectedAirline(e.target.value);
  };

  // Seçilen havayoluna göre filtrelenmiş uçuşlar
  const filteredFlights = selectedAirline
    ? flights.filter((flight) => flight.airline === selectedAirline)
    : flights;

  return (
    <div className="container mx-auto">
      {filteredFlights.length === 0 ? (
        <div className="text-center text-gray-500">Uçuş bulunamadı</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Uçuş Kartları Sütunu */}
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {filteredFlights.map((flight) => (
                <div key={flight.flightId} className="w-full">
                  <div className="bg-white shadow-lg rounded-lg p-6 relative">
                    <div className="flex justify-between">
                      <h5 className="text-lg font-semibold">
                        {flight.departureLocation} - {flight.arrivalLocation}
                      </h5>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="text-left">
                        <p className="mb-1">
                          <i className="fas fa-plane-departure"></i> Departure
                        </p>
                        <p className="mb-1 font-bold">
                          {new Date(
                            flight.departureDateTime
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <p className="mb-1">
                          Airport: {flight.departureAirport}
                        </p>
                      </div>

                      <hr className="w-16 border-t-2 border-gray-400 mx-6" />

                      <div className="text-center">
                        <p className="mb-1">{flight.airline}</p>
                        <FaPlane
                          className="text-[#4B0097] my-2 mx-auto"
                          size={15}
                        />
                        <p className="mb-1">2h 25m (Nonstop)</p>
                      </div>

                      <hr className="w-16 border-t-2 border-gray-400 mx-6" />

                      <div className="text-right">
                        <p className="mb-1">
                          <i className="fas fa-plane-arrival"></i> Arrival
                        </p>
                        <p className="mb-1 font-bold">
                          {new Date(flight.arrivalDateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                        <p className="mb-1">Airport: {flight.arrivalAirport}</p>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <div>
                        <p className="text-[#4B0097] font-bold">
                          Price: $235
                        </p>
                        <p className="text-sm">{flight.tripType}</p>
                      </div>
                      <button
                        onClick={() => handlePost(flight)}
                        className="bg-[#4B0097] text-white py-5 px-10 rounded-lg absolute bottom-0 right-0"
                      >
                        Book Flight
                      </button>
                    </div>
                  </div>
                  <div className="text-left">
                    <button className="text-[#4B0097] underline p-2 bg-[#E6E0EB] rounded-lg">
                      Check the details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filtre Sütunu */}
          <div className="col-span-1 p-6">
            <div>
              <h4 className="font-semibold mb-4">Sort by:</h4>
              <select className="rounded-lg p-2 mb-4 w-full">
                {sortOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-4">Arrival Time</h4>
              {arrivalTimeOptions.map((time, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="radio"
                    name="arrivalTime"
                    id={`arrival-${index}`}
                    value={time}
                    className="mr-2 accent-[#4B0097]"
                  />
                  <label htmlFor={`arrival-${index}`}>{time}</label>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-4">Stops</h4>
              {stopOptions.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      id={`stops-${index}`}
                      value={stop}
                      className="mr-2 accent-[#4B0097]"
                    />
                    <label htmlFor={`stops-${index}`}>{stop}</label>
                  </div>
                  <span>$230</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-4">Airlines Included</h4>
              {airlines.map((airline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="airline"
                      id={`airline-${index}`}
                      value={airline}
                      className="mr-2 accent-[#4B0097]"
                      onChange={handleAirlineChange} // Seçim değiştiğinde durumu güncelle
                    />
                    <label htmlFor={`airline-${index}`}>{airline}</label>
                  </div>
                  <span>$230</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsCard;
