import { IAuthResponse, IUser, Token } from "@/interfaces/interfaces";
import { removeFromStorage } from "@/services/auth/auth.helper";
import authService from "@/services/auth/auth.service";
import { create } from "zustand";
import Cookies from "js-cookie";

interface IAuthStore {
  user: IUser | null;
  isAuth: boolean;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<IAuthResponse | undefined>;
  logout: () => void;
  checkAuth: () => Promise<IAuthResponse | undefined>;
}

export const useAuth = create<IAuthStore>((set) => ({
  user: typeof window !== "undefined" && !!Cookies.get(Token.refreshToken) && JSON.parse(localStorage.getItem("user") || "{}"),
  isAuth: typeof window !== "undefined" && !!Cookies.get(Token.refreshToken),
  register: async (firstName, lastName, email, password): Promise<void> => {
    try {
      return authService.register(firstName, lastName, email, password);
    } catch (err) {}
  },
  login: async (email, password): Promise<IAuthResponse | undefined> => {
    try {
      const response = authService.login(email, password);
      response
        .then((data) => {
          set({ isAuth: true, user: data.user_details });
        })
        .catch(() => {
          set({ isAuth: false, user: null });
        });
      return response;
    } catch (err) {}
  },
  checkAuth: async (): Promise<IAuthResponse | undefined> => {
    try {
      const response = authService.getNewTokens();
      response
        .then((data) => {
          data && set({ isAuth: true, user: data.user_details });
        })
        .catch(() => {
          set({ isAuth: false, user: null });
          removeFromStorage();
        });
      return response;
    } catch (err) {}
  },
  logout: async () => {
    removeFromStorage();
    window.location.reload();
  },
}));
