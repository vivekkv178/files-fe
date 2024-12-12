import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process?.env?.NEXT_PUBLIC_FILES_BE_URL,
  // baseURL: "http://localhost:3001/files",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});

export default axiosInstance;
