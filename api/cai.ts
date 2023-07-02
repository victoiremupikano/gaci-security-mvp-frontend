import api from "./index";

declare type CaiAPIResponse = Record<string, any> & {
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

const Cai = {
  async add(
    data: Record<string, any>,
  ): Promise<CaiAPIResponse> {
    return api.post(
      "/cai-list-create/",
      data,
      "security-data"
    );
  },
  async update(
    data: Record<string, any>,
    id: string
  ): Promise<CaiAPIResponse> {
    return api.put("/cai-update/" + id + "/", data, "security-data");
  },
  async delete(id: string): Promise<CaiAPIResponse> {
    return api.delete("/cai-delete/" + id + "/", "security-data");
  },
  async get(id: string | number): Promise<CaiAPIResponse> {
    return api.get("/cai-detail/" + id, "security-data");
  },
  async getAll(): Promise<CaiAPIResponse> {
    return api.get("/cai-list-create/", "security-data");
  },
  async getAllProgress(): Promise<CaiAPIResponse> {
    return api.get("/cai-in-progress-list-all/", "security-data");
  },
  async getAllFinish(): Promise<CaiAPIResponse> {
    return api.get("/cai-is-finish-list-all/", "security-data");
  },
  async getAllCancel(): Promise<CaiAPIResponse> {
    return api.get("/cai-is-cancel-list-all/", "security-data");
  },
};

export default Cai;
