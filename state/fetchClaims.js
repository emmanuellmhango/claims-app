import axios from "axios";
import { GENERAL_URL } from "./url";

export const fetchClaims = async (id) => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims_for_mobile`, {
      params: id,
    });
    const { success, claims } = response.data;
    return success ? claims : 0;
  } catch (error) {
    return 0;
  }
};
