import api from "./index";

declare type TrracAPIResponse = Record<string, any> & {
  type?: "success" | "error" | "auth";
  data?: any;
  status?: number;
  statusText?: string;
  token?: any;
  pk?: any;
  results?: any[];
  next?: "";
  previous?: "";
};

const Trrac = {
  async getTrrac(id: string, type: string, url: string, longitude: string, latittude: string): Promise<TrracAPIResponse> {
    return await api.post("/try-recognition-run-a-check/", { id, type, url, longitude, latittude }, "security-data");
  },
};

export default Trrac;
