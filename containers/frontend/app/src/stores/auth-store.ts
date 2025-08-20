import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  token: string;
};

type Actions = {
  isTokenValid: () => Promise<boolean>;
  isTokenExpiringSoon: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      token: "",

      isTokenValid: async () => {
        return false;
      },
      isTokenExpiringSoon: async () => {
        return false;
      },
      refreshToken: async () => {
        return false;
      },
    })),
    {
      name: "auth",
      partialize: ({ token }) => ({ token }),
    },
  ),
);
