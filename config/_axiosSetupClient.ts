import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    config.headers["Access-Control-Allow-Origin"] =
      process.env.NEXT_PUBLIC_API_URL;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Handle successful responses globally if needed.
    if (response.status === 200 || response.status === 201) {
      return response;
    }

    return Promise.reject(response);
  },
  async (error) => {
    // Handle errors globally if needed.
    if (error.response.status === 401) {
      // Token expired, attempt to refresh it
      try {
        // Attempt to refresh the token

        // Update the access token in the cookies

        // Retry the failed request with the new token
        const originalRequest = error.config;

        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
