import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { ResponseWithData } from "models/api/responses";
import type { Token, TokenResponse } from "models/api/login-payload";
import { createAPIClient } from "@/services/api-client";

type RetrieveTokenPayload = {
  email: string;
  password: string;
};

type State = {
  token: string;
  expiresAt: string;
};

type Actions = {
  isTokenValid: () => Promise<boolean>;
  isTokenExpiringSoon: () => Promise<boolean>;

  retrieveToken: (credentials: RetrieveTokenPayload) => Promise<void>;
  refreshToken: () => Promise<boolean>;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      token: "",
      expiresAt: "",

      isTokenValid: async () => {
        const { token } = get();

        if (!token) {
          return false;
        }

        return false;
      },
      isTokenExpiringSoon: async () => {
        const { token } = get();

        if (!token) {
          return false;
        }

        return false;
      },
      retrieveToken: async ({ email, password }) => {
        const { token } = get();
        const client = createAPIClient(token);

        try {
          const { data } = await client
            .post({ email, password }, "/auth/login")
            .badRequest((error) => {
              console.error("BAD REQUEST", error);
            })
            .unauthorized((error) => {
              console.error("UNAUTHORIZED", error);
            })
            .json<ResponseWithData<TokenResponse>>();

          set((state) => {
            state.token = data.token.token;
            state.expiresAt = data.token.expiresAt;
          });
        } catch (error) {
          console.error("RETRIEVE TOKEN ERROR", error);
        }
      },
      refreshToken: async () => {
        const { token } = get();

        if (!token) {
          return false;
        }

        return false;
      },
    })),
    {
      name: "auth",
      partialize: ({ token, expiresAt }) => ({ token, expiresAt }),
    },
  ),
);
