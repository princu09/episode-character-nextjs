import axios, { AxiosResponse } from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
api.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Handle successful responses globally if needed.
    if (response.status == 200 || response.status == 201) {
      return response;
    }

    return Promise.reject(response);
  },
  async (error) => {
    // Handle errors globally if needed.
    if (error.response.status === 401) {
      // Token expired, attempt to refresh it
      try {
        // Call your refresh token endpoint to obtain a new access token
        // Update the access token in the cookies
        // Retry the failed request with the new token
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Handle errors globally if needed.
    return Promise.reject(error);
  }
);

export default api;
