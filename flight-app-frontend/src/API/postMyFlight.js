import axios from "axios";
import { toastSuccessNotify } from "../helper/ToastNotify";

export const postMyFlight = async (flightData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/myFlight",
      flightData
    );
    toastSuccessNotify("Your reservation has been created successfully..");
    return response.data;
  } catch (error) {
    console.error("Error posting flight data", error);
    throw error;
  }
};
