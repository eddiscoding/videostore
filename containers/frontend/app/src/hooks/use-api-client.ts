import wretch from "wretch";
import { useAuthStore } from "@/stores/auth-store";

const getDefaultConfig = () => {
  // TODO: Environment Variables?
  const SCHEME_API = "https://";
  const HOST_API = "api.videostore.localhost";
  const SUBPATH_API = "/api/v1";

  return wretch(`${SCHEME_API}${HOST_API}${SUBPATH_API}`);
};

export const useAPIClient = () => {
  const { token } = useAuthStore();

  // Get client with default configuration
  const client = getDefaultConfig();

  // Add Authorization header if there is a token stored
  if (token) {
    client.auth(`Bearer ${token}`);
  }

  return client;
};
