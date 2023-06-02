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

const NewsLetter = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<FnAPIResponse> {
    return api.post("/subsriber-news-letters-list-create/" + entreprize_id, data, 'share_param');
  },
  async update(data: Record<string, any>, id: string): Promise<FnAPIResponse> {
    return api.put("/subsriber-news-letters-update/" + id + "/", data, 'share_param');
  },
  async delete(id:string): Promise<FnAPIResponse> {
    return api.delete("/subsriber-news-letters-delete/"+id+'/', 'share_param');
  },
  async getAll(entreprize_id:string): Promise<FnAPIResponse> {
    return api.get("/subsriber-news-letters-list-create/" + entreprize_id, 'share_param');
  },
  async get(id:string | number, entreprize_id:string): Promise<FnAPIResponse> {
    return api.get("/subsriber-news-letters-detail/" + id + "/" + entreprize_id, 'share_param');
  },
};

export default NewsLetter;
