import wretch from "wretch";

export const getBackendClient = () => {
  const client = wretch("https://api.videostore.localhost/api").options({
    credentials: "same-origin",
  });

  // TODO: Check if any additional configuration is needed

  return client;
};
