import { ResponseBody } from "../../pkg/stdresponse";
import { StdError, ErrInternalServerError } from "../../pkg/stderror";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const axiosClient = axios.create();
axiosClient.defaults.timeout = 2500;

export interface ResponseProps {
  status: number;
  data: ResponseBody;
}

export const axiosFetch = async (
  config: AxiosRequestConfig
): Promise<ResponseProps> => {
  try {
    const res = await axiosClient(config);

    if (res.status < 300) {
      return { status: res.status, data: res.data };
    }
  } catch (e: any) {
    const error = e as AxiosError;
    if (error.response) {
      const data = error.response.data as StdError;
      let res: ResponseBody = {
        error: data,
      };
      return { status: error.response.status, data: res };
    }
  }
  let internalResErr: ResponseBody = {
    error: ErrInternalServerError(),
  };

  return { status: 500, data: internalResErr };
};

export const axiosFetcher = (config: AxiosRequestConfig) =>
  axios(config).then((res) => res.data.data);

export default axiosClient;
