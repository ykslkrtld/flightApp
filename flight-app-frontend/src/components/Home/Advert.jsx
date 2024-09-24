import carRental from "../../assets/carRental.jpeg";
import hotels from "../../assets/hotels.png";
import travelPackages from "../../assets/travelPackages.jpeg";

import { FaCarAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { FaUmbrellaBeach } from "react-icons/fa6";

export default function Advert() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <img className="rounded-lg h-60 w-full object-cover" src={carRental} alt="Car Rentals" />
        <div className="absolute bottom-2 left-2 text-white">
          <FaCarAlt className="size-6" />
          <p>CAR RENTALS</p>
        </div>
      </div>
      <div className="relative">
        <img className="rounded-lg h-60 w-full object-cover" src={hotels} alt="Hotels" />
        <div className="absolute bottom-2 left-2 text-white">
          <FaHotel className="size-6" />
          <p>HOTELS</p>
        </div>
      </div>
      <div className="relative">
        <img className="rounded-lg h-60 w-full object-cover" src={travelPackages} alt="Travel Packages" />
        <div className="absolute bottom-2 left-2 text-white">
          <FaUmbrellaBeach className="size-6" />
          <p>TRAVEL PACKAGES</p>
        </div>
      </div>
    </div>
  );
}
