import axios, { AxiosError } from "axios";
import StdError, { ErrServiceUnavailable } from "../../pkg/stderror";
import { StdResponse } from "../../pkg/stdresponse";

const mailerUrl = process.env.APP_MAILER_URL;
const mailerClient = axios.create();
mailerClient.defaults.baseURL = mailerUrl;

export interface ISendEmailRequest {
  email: string;
  message: string;
}

export interface ISendEmailResponse {
  status: string;
  sentTime: string;
}

export const sendEmail = async (
  payload: ISendEmailRequest
): Promise<StdResponse<ISendEmailResponse>> => {
  try {
    const res = await mailerClient.post("/send-email", payload);
    return { status: res.status, result: res.data };
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const err = new StdError(error.response.status, error.response.data);

      return { status: error.response?.status, err: err };
    }
    const err = ErrServiceUnavailable();
    return { status: err.status, err: err };
  }
};
