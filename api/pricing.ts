import { ResponseGlobal } from "../types";
import api from "./index";

declare type PricingAPIResponse = Record<string, any> & {
  type?: "success" | "error" | "auth";
  data?: any;
  status?: number;
  statusText?: string;
  token?: any;
  pk?: any;
  results?: any[];
} & ResponseGlobal;

const Pricing = {
  async add(data: Record<string, any>): Promise<PricingAPIResponse> {
    return api.post("/pricing-list-create/", data, "mscm/settings");
  },
  async update(data: Record<string, any>, id: string): Promise<PricingAPIResponse> {
    return api.put("/pricing-update/" + id + "/", data, "mscm/settings");
  },
  async delete(id: string): Promise<PricingAPIResponse> {
    return api.delete("/pricing-delete/" + id + "/", "mscm/settings");
  },
  async getAll(): Promise<PricingAPIResponse> {
    return api.get("/pricing-list-create/", "mscm/settings");
  },
  async getActive(): Promise<PricingAPIResponse> {
    return api.get("/pricing-list-active/", "mscm/settings");
  },
  async get(id: string | number): Promise<PricingAPIResponse> {
    return api.get("/pricing-detail/" + id, "mscm/settings");
  },
};

export default Pricing;
