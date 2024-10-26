import { IAuthResponse, Storage, Token } from "@/interfaces/interfaces";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get(Token.accessToken);
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem(Storage.user) || "{}");
};

export const saveTokensStorage = (data: { access_token: string; refresh_token: string }) => {
  Cookies.set(Token.accessToken, data.access_token);
  Cookies.set(Token.refreshToken, data.refresh_token, { sameSite: "strict", expires: 7, secure: true });
};

export const removeFromStorage = () => {
  Cookies.remove(Token.accessToken);
  Cookies.remove(Token.refreshToken);
  localStorage.removeItem(Storage.user);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem(Storage.user, JSON.stringify(data.user_details));
};
