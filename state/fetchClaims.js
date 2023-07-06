import axios from "axios";
import { GENERAL_URL } from "./url";

export const fetchClaims = async (id) => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims_for_mobile`, {
      params: { user_id: id },
    });
    console.log(response.data);
    const { success, claims } = response.data;
    return success ? claims : null;
  } catch (error) {
    console.log(error);
  }
};
