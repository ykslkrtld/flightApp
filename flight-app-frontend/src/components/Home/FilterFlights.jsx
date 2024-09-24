import { useState, forwardRef } from "react";
import { IoAirplane } from "react-icons/io5";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Stilleri import et
import { getFlights } from "../../API/getFlights";
import destinations from "../../helper/Destinations.json";
import { toastErrorNotify } from "../../helper/ToastNotify";


const FilterFlights = ({ setFlights, setSelectedAirline }) => {
  const [isRoundTrip, setIsRoundTrip] = useState(true); // Gidiş-dönüş seçimi
  const [departureDate, setDepartureDate] = useState(null); // Gidiş tarihi
  const [selectedDeparture, setSelectedDeparture] = useState(""); // Seçilen kalkış yeri
  const [selectedArrival, setSelectedArrival] = useState(""); // Seçilen varış yeri
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState(""); // Kalkış havaalanı
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState(""); // Varış havaalanı

  // Filtreleme işlemi
  const handleFilter = async () => {
    // Gerekli alanların kontrolü
    if (
      !departureDate ||
      !selectedDepartureAirport ||
      !selectedArrivalAirport
    ) {
      toastErrorNotify("All fields are required");
      return;
    }

    // Tarih formatını 'yyyy-MM-dd' olarak al
    const localDate = departureDate.toLocaleDateString("sv-SE");
    const data = await getFlights(
      localDate,
      selectedDepartureAirport,
      selectedArrivalAirport
    );
    setFlights(data); // Filtrelenmiş uçuşları ayarla
    setSelectedAirline(""); // Seçili havayolunu sıfırla
  };

  // Kalkış yeri değişikliği
  const handleDepartureChange = (e) => {
    const selectedLocation = e.target.value;
    // Eğer boş veya hatalı bir değer seçildiyse kontrol et
    if (!selectedLocation || !selectedLocation.includes("(")) {
      setSelectedDeparture("");
      setSelectedDepartureAirport("");
      return;
    }
    const airport = selectedLocation.split("(")[1].replace(")", "").trim();
    setSelectedDeparture(selectedLocation);
    setSelectedDepartureAirport(airport);
    setSelectedArrival(""); // Varış kutusunu sıfırla
  };

  // Varış seçeneklerini elde et
  const getArrivalOptions = () => {
    if (selectedDeparture.includes("Amsterdam")) {
      // Eğer kalkış yeri Amsterdam ise diğer şehirleri döndür
      return destinations.filter((dest) => dest.city !== "Amsterdam");
    } else if (selectedDeparture !== "") {
      // Eğer başka bir şehir seçilmişse sadece Amsterdam'ı döndür
      return destinations.filter((dest) => dest.city === "Amsterdam");
    }
    return [];
  };

  // Özel tarih girişi bileşeni
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="relative flex items-center">
      <IoMdCalendar
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#4B0097]"
        size={20}
      />
      <input
        type="text"
        className="pl-10 p-2 rounded-lg border"
        value={value}
        onClick={onClick}
        readOnly // Sadece okunur
      />
    </div>
  ));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <IoAirplane className="text-[#4B0097]" size={24} />
          <span className="text-xl font-semibold">BOOK YOUR FLIGHT</span>
        </div>

        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full overflow-hidden flex">
            <button
              className={`py-2 px-4 ${
                isRoundTrip
                  ? "bg-[#4B0097] text-white"
                  : "text-[#4B0097] bg-[#E6E0EB]"
              }`}
              onClick={() => setIsRoundTrip(true)}
              style={{
                borderTopLeftRadius: "9999px",
                borderBottomLeftRadius: "9999px",
              }}
            >
              RoundTrip
            </button>
            <button
              className={`py-2 px-4 ${
                !isRoundTrip
                  ? "bg-[#4B0097] text-white"
                  : "text-[#4B0097] bg-[#E6E0EB]"
              }`}
              onClick={() => setIsRoundTrip(false)}
              style={{
                borderTopRightRadius: "9999px",
                borderBottomRightRadius: "9999px",
              }}
            >
              One Way
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mb-4 space-y-4 md:space-y-0">
        <div className="relative flex items-center w-full md:w-40">
          <BiSolidPlaneTakeOff
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#4B0097]"
            size={20}
          />
          <select
            className="pl-10 p-2 rounded-lg border w-full md:w-40"
            value={selectedDeparture}
            onChange={handleDepartureChange}
          >
            <option value=""></option>
            {destinations.map((dest, index) => (
              <option key={index} value={`${dest.city} (${dest.iata})`}>
                {`${dest.city} (${dest.iata})`}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex items-center w-full md:w-40">
          <BiSolidPlaneLand
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#4B0097]"
            size={20}
          />
          <select
            className="pl-10 p-2 rounded-lg border w-full md:w-40"
            value={selectedArrival}
            onChange={(e) => {
              const selectedLocation = e.target.value;

              // Eğer boş bir değer seçildiyse kontrol et
              if (!selectedLocation || !selectedLocation.includes("(")) {
                setSelectedArrival("");
                setSelectedArrivalAirport("");
                return;
              }

              const airport = selectedLocation
                .split("(")[1]
                .replace(")", "")
                .trim();
              setSelectedArrival(selectedLocation);
              setSelectedArrivalAirport(airport);
            }}
            disabled={!selectedDeparture} // Kalkış yeri seçilmediyse devre dışı bırak
          >
            <option value=""></option>
            {getArrivalOptions().map((dest, index) => (
              <option key={index} value={`${dest.city} (${dest.iata})`}>
                {`${dest.city} (${dest.iata})`}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)} // Tarih değişiminde durumu güncelle
            customInput={<CustomInput />} // Özel girdi kullan
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {isRoundTrip && (
          <div className="relative flex items-center w-full md:w-auto">
            <IoMdCalendar
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#4B0097]"
              size={20}
            />
            <DatePicker
              selected={null} // Geri dönüş tarihi için durumu ekleyebilirsin
              onChange={() => {}} // Geri dönüş tarihi değişimi için işlem
              className="pl-10 p-2 rounded-lg border w-full md:w-auto"
              dateFormat="yyyy-MM-dd"
              disabled // Şu an için devre dışı bırak
            />
          </div>
        )}
      </div>

      <div className="flex justify-start">
        <button
          onClick={handleFilter}
          className="bg-[#4B0097] text-white py-2 px-4 rounded-lg"
        >
          Show Flights
        </button>
      </div>
    </div>
  );
};

export default FilterFlights;
