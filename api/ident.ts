import api from "./index";

declare type IdentAPIResponse = Record<string, any> & {
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

const Ident = {
  async get(id: string | number): Promise<IdentAPIResponse> {
    return api.get("/recognized-detail/" + id, "security-data");
  },
  async getAll(): Promise<IdentAPIResponse> {
    return api.get("/recognized-list-all/", "security-data");
  },
};

export default Ident;
