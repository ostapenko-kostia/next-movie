import instance from "@/api/api.interceptor";
import { ApiRoutes, IAuthResponse, Token } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
import { removeFromStorage, saveToStorage } from "./auth.helper";

const authService = {
  async register(firstName: string, lastName: string, email: string, password: string) {
    return (await instance.post<string, { data: void }>(ApiRoutes.register, { first_name: firstName, last_name: lastName, email, password })).data;
  },

  async login(email: string, password: string) {
    const response = await instance.post<string, { data: IAuthResponse }>(ApiRoutes.login, { email, password });
    if (response.data.access_token) saveToStorage(response.data);
    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(Token.refreshToken);
    if (refreshToken) {
      const response = await instance.post<string, { data: IAuthResponse }>(ApiRoutes.refresh, { token: refreshToken });
      if (response.data.access_token) saveToStorage(response.data);
      return response.data;
    } else {
      removeFromStorage();
    }
  },

  async googleLogin(client_id: string, credentials: string) {
    const response = await instance.post<string, { data: IAuthResponse }>(ApiRoutes.googleLogin, { client_id, credentials });
    if (response.data.access_token) saveToStorage(response.data);
    return response.data;
  },
};

export default authService;
