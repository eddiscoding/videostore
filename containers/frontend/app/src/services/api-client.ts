import wretch from "wretch";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";

const getDefaultConfig = () => {
  // TODO: Environment Variables?
  const SCHEME_API = "https://";
  const HOST_API = "api.videostore.localhost";
  const SUBPATH_API = "/api/v1";

  return wretch(`${SCHEME_API}${HOST_API}${SUBPATH_API}`)
    .addon(FormDataAddon)
    .addon(QueryStringAddon);
};

export const createAPIClient = (token: string) => {
  const client = getDefaultConfig();

  if (token) {
    client.auth(`Bearer ${token}`);
  }

  return client;
};
