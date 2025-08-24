import { differenceInHours, parseISO } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { TokenResponse } from "@/models/api/login-payload";
import type { ResponseWithData } from "@/models/api/responses";
import { createAPIClient } from "@/services/api-client";

type RetrieveTokenPayload = {
  email: string;
  password: string;
};

type AuthError = "BAD_REQUEST" | "UNAUTHORIZED" | "NETWORK_ERROR" | "UNKNOWN";

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AuthError };

type State = {
  token: string;
  expiresAt: string;
};

type Actions = {
  isTokenValid: () => Promise<boolean>;
  isTokenExpiringSoon: () => boolean;

  retrieveToken: (credentials: RetrieveTokenPayload) => Promise<Result<void>>;
  refreshToken: () => Promise<boolean>;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      token: "",
      expiresAt: "",

      isTokenValid: async () => {
        const { token, isTokenExpiringSoon, refreshToken } = get();
        const client = createAPIClient(token);

        if (!token) {
          return false;
        }

        try {
          const response = await client.get("/healthcheck/auth").res();
          if (response.ok) {
            try {
              if (isTokenExpiringSoon()) {
                await refreshToken();
                console.info("Token refreshed correctly.");
              }
            } catch (_error) {
              console.info("Token could not be refreshed.");
            }

            return true;
          }
        } catch (_error) {
          return false;
        }

        return false;
      },
      isTokenExpiringSoon: () => {
        const { token, expiresAt } = get();

        if (!token || !expiresAt) {
          throw new Error(
            "Undesired state. isTokenExpiringSoon should not be called before actually owning a token.",
          );
        }

        const now = new Date();
        const parsedDate = parseISO(expiresAt);
        const diffHours = Math.floor(differenceInHours(parsedDate, now));

        if (diffHours < 2) {
          // Token is close to expire, it should be refreshed
          return true;
        }

        return false;
      },
      retrieveToken: async ({ email, password }) => {
        const { token } = get();
        const client = createAPIClient(token);

        try {
          const { data } = await client
            .post({ email, password }, "/auth/login")
            .badRequest(() => {
              throw { type: "BAD_REQUEST" } as const;
            })
            .error(422, () => {
              throw { type: "BAD_REQUEST" } as const;
            })
            .unauthorized(() => {
              throw { type: "UNAUTHORIZED" } as const;
            })
            .json<ResponseWithData<TokenResponse>>();

          set((state) => {
            state.token = data.token.token;
            state.expiresAt = data.token.expiresAt;
          });

          return { success: true, data: undefined };
        } catch (err: unknown) {
          if (err && typeof err === "object" && "type" in err) {
            const e = err as { type?: string };
            if (e.type === "BAD_REQUEST" || e.type === "UNAUTHORIZED") {
              return { success: false, error: e.type };
            }
          }

          if (err instanceof TypeError) {
            // fetch network failure
            return { success: false, error: "NETWORK_ERROR" };
          }

          return { success: false, error: "UNKNOWN" };
        }
      },
      refreshToken: async () => {
        const { token } = get();
        const client = createAPIClient(token);

        if (!token) {
          return false;
        }

        try {
          const { data } = await client
            .post({}, "/auth/refresh")
            .json<ResponseWithData<TokenResponse>>();

          set((state) => {
            state.token = data.token.token;
            state.expiresAt = data.token.expiresAt;
          });
        } catch (_error) {
          return false;
        }

        return true;
      },
    })),
    {
      name: "auth",
      partialize: ({ token, expiresAt }) => ({ token, expiresAt }),
    },
  ),
);
