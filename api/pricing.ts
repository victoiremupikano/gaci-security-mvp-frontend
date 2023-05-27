import { ResponseGlobal } from "../types";
import api from "./index";

declare type FnAPIResponse = Record<string,any> & {
  type?: "success" | "error" | "auth";
  data?: any;
  status?: number;
  statusText?: string;
  token?: any;
  pk?: any;
  results?: any[];
} & ResponseGlobal

const Pricing = {
  async add(data: Record<string, any>): Promise<FnAPIResponse> {
    return api.post("/pricing-list-create/", data, 'mscm/settings');
  },
  async update(data: Record<string, any>, id: string): Promise<FnAPIResponse> {
    return api.put("/pricing-update/" + id + "/", data, 'mscm/settings');
  },
  async delete(id:string): Promise<FnAPIResponse> {
    return api.delete("/pricing-delete/"+id+'/', 'mscm/settings');
  },
  async getAll(): Promise<FnAPIResponse> {
    return api.get("/pricing-list-create/", 'mscm/settings');
  },
  async get(id:string | number): Promise<FnAPIResponse> {
    return api.get("/pricing-detail/" + id, 'mscm/settings');
  },
};

export default Pricing;
