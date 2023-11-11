import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import logger from "./logService";
import { Alert } from "react-native";

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (expectedError) {
      logger.log(error);
      Alert.alert("An unexpected error occurred."); // Corrected to use Alert.alert
    }

    return Promise.reject(error);
  }
);

function setJwt(jwt: string | null) {
  if (jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
