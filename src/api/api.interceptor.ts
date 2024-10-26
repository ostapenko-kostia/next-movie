import axios from "axios";
import { getContentType } from "./api.helper";
import { getAccessToken, removeFromStorage } from "@/services/auth/auth.helper";
import authService from "@/services/auth/auth.service";
import Cookies from "js-cookie";
import { Token } from "@/interfaces/interfaces";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config.headers && accessToken && !config.url?.includes('api/auth')) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get(Token.refreshToken);

    if ((error.response.status === 401 || error.response.status === 403) && error.config && !error.config._isRetry && refreshToken) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        removeFromStorage();
      }
    }
  }
);

export default instance;
