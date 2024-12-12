import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";
import { useAppSelector } from "./reduxHooks";

const useApi = () => {
  const authState = useAppSelector((state) => state.auth);

  const callApi = async (config: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        data: config?.data,
        headers: {
          Authorization: `Bearer ${authState?.user?.stsTokenManager?.accessToken}`,
        },
      });
      return response?.data;
    } catch (error: any) {
      throw error;
    } finally {
    }
  };

  return { callApi };
};

export default useApi;
