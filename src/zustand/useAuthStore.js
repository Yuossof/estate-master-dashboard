import { create } from "zustand";
import Cookies from "js-cookie";
import { getCookieVal } from "../lib/token";

const useAuthStore = create((set) => ({
  token: getCookieVal("token") || null,
  user: null,

  setToken: (token) => {
    if (token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token"); 
    }
    set({ token });
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
