import api from "./index";

declare type PaAPIResponse = Record<string, any> & {
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

const Pa = {
  async add(
    data: Record<string, any>,
  ): Promise<PaAPIResponse> {
    return api.post(
      "/pa-list-create/",
      data,
      "security-data"
    );
  },
  async update(
    data: Record<string, any>,
    id: string
  ): Promise<PaAPIResponse> {
    return api.put("/pa-update/" + id + "/", data, "security-data");
  },
  async delete(id: string): Promise<PaAPIResponse> {
    return api.delete("/pa-delete/" + id + "/", "security-data");
  },
  async get(id: string | number): Promise<PaAPIResponse> {
    return api.get("/pa-detail/" + id, "security-data");
  },
  async getAll(): Promise<PaAPIResponse> {
    return api.get("/pa-list-create/", "security-data");
  },
  async getAllProgress(): Promise<PaAPIResponse> {
    return api.get("/pa-in-progress-all/", "security-data");
  },
  async getAllFinish(): Promise<PaAPIResponse> {
    return api.get("/pa-in-finish-all/", "security-data");
  },
  async getAllCancel(): Promise<PaAPIResponse> {
    return api.get("/pa-in-cancel-all/", "security-data");
  },
};

export default Pa;
