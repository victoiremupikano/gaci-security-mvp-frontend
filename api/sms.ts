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

const SMS = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<FnAPIResponse> {
    return api.post("/sms-message-list-create/" + entreprize_id + "/", data, 'share_param');
  },
  async delete(id:string): Promise<FnAPIResponse> {
    return api.delete("/sms-message-delete/"+id+'/', 'share_param');
  },
  async getAll(entreprize_id:string): Promise<FnAPIResponse> {
    return api.get("/sms-message-list-create/" + entreprize_id, 'share_param');
  },
  async get(id:string | number, entreprize_id:string): Promise<FnAPIResponse> {
    return api.get("/sms-message-detail/" + id + "/" + entreprize_id, 'share_param');
  },
  async getGsmVerify(ip: string): Promise<FnAPIResponse> {
    return api.post("/gsm-verify/",  { ip }, 'share_param');
  },
};

export default SMS;
