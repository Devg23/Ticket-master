import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token && config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
});

let isRefreshing = false;
const failedQueue = [];

const processQueue = (error, token = null) => {
  while (failedQueue.length > 0) {
    const { resolve, reject, originalRequest } = failedQueue.shift();

    if (error) {
      reject(error);
      continue;
    }

    if (token && originalRequest?.headers) {
      originalRequest.headers.Authorization = `Bearer ${token}`;
    }

    resolve(api(originalRequest));
  }
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const message = error.response?.data?.message;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      message === "Invalid or expired access token"
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await refreshClient.get("/auth/refresh");
        const { accessToken } = data;

        if (!accessToken) {
          throw new Error("No access token returned from refresh endpoint");
        }

        localStorage.setItem("token", accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (message === "No refresh token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export const setAuthHeader = token => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    refreshClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    delete refreshClient.defaults.headers.common.Authorization;
  }
};

export default api;
