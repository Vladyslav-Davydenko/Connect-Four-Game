import axios, { AxiosResponse } from "axios";

import { EX_SYSTEM, EX_UNAUTHORIZED } from "../common";

export type HttpResponseType<T> = Promise<AxiosResponse<T>>;

export const httpCommon = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

httpCommon.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    let message = error.message;

    if (!error.response || !error.response.status) {
      return Promise.reject({ message, code: "400" }); // default to 400 Bad Request
    }

    switch (error.response.status) {
      case 403:
        return Promise.reject({ message: EX_UNAUTHORIZED, code: "403" });

      case 500:
        return Promise.reject({ message: EX_SYSTEM, code: "500" });

      default: //default to error 400 Bad Request
        if (error.response.data && error.response.data.message) {
          message = error.response.data.message;
        }
        return Promise.reject({ message, code: "400" });
    }
  }
);
