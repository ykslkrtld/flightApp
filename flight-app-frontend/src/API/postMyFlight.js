import axios from "axios";
import { toastSuccessNotify } from "../helper/ToastNotify";

export const postMyFlight = async (flightData) => {
  try {
    const response = await axios.post(
      "https://flight-app-vert.vercel.app/myFlight",
      flightData
    );
    toastSuccessNotify("Your reservation has been created successfully..");
    return response.data;
  } catch (error) {
    console.error("Error posting flight data", error);
    throw error;
  }
};
