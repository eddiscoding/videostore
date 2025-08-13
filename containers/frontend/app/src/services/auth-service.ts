import type { AuthStatus, ResponseWithData } from "@/types/backend-types";
import { getBackendClient } from "./api-service";

export const isUserLoggedIn = async () => {
  const client = getBackendClient();
  const { data } = await client
    .get("/auth/status")
    .json<ResponseWithData<AuthStatus>>();

  return data.authenticated;
};
