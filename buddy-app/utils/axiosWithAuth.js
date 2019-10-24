import axios from "axios";
import { getToken } from "./authHelper";

export const axiosWithAuth = () => {
  let token = getToken();
  return axios.create({
    headers: {
      Authorization: token
    }
  });
};
