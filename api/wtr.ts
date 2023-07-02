import api from "./index";

declare type WtrAPIResponse = Record<string, any> & {
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

const Wtr = {
  async add(
    data: Record<string, any>,
  ): Promise<WtrAPIResponse> {
    return api.post(
      "/wtr-list-create/",
      data,
      "security-data"
    );
  },
  async update(
    data: Record<string, any>,
    id: string
  ): Promise<WtrAPIResponse> {
    return api.put("/wtr-update/" + id + "/", data, "security-data");
  },
  async delete(id: string): Promise<WtrAPIResponse> {
    return api.delete("/wtr-delete/" + id + "/", "security-data");
  },
  async get(id: string | number): Promise<WtrAPIResponse> {
    return api.get("/wtr-detail/" + id, "security-data");
  },
  async getAll(): Promise<WtrAPIResponse> {
    return api.get("/wtr-list-create/", "security-data");
  },

  async getAllProgress(): Promise<WtrAPIResponse> {
    return api.get("/wtr-in-progress-list-all/", "security-data");
  },
  async getAllFinish(): Promise<WtrAPIResponse> {
    return api.get("/wtr-is-finish-list-all/", "security-data");
  },
  async getAllCancel(): Promise<WtrAPIResponse> {
    return api.get("/wtr-is-cancel-list-all/", "security-data");
  },
};

export default Wtr;
