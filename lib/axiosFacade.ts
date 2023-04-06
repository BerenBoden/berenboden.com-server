import axios, { Method } from "axios";
interface AxiosResponse {
  success: boolean;
  data: any;
  status: number | null;
}

export const axiosFacade = async (
  method: Method,
  url: string,
  data: any = null,
  headers: any = null
): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      ...headers,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};
