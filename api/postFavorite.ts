import api from "./index";

declare type postFavoriteAPIResponse = Record<string, any> & {
  type?: "success" | "error" | "auth";
  data?: any;
  status?: number;
  statusText?: string;
  token?: any;
  pk?: any
  results?: any[]
  next?:''
  previous?:''
};

const postFavorite = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<postFavoriteAPIResponse> {
    return api.post(
      "/post-favorite-list-create/" + entreprize_id + "/", data, "share_pub"
    );
  },
  async update(data: Record<string, any>, id: string): Promise<postFavoriteAPIResponse> {
    return api.put("/post-favorite-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<postFavoriteAPIResponse> {
    return api.delete("/post-favorite-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id:string): Promise<postFavoriteAPIResponse> {
    return api.get("/post-favorite-list-create/" + entreprize_id, "share_pub");
  },
  async get(id:string | number, entreprize_id:string): Promise<postFavoriteAPIResponse> {
    return api.get("/post-favorite-detail/" + id + "/" + entreprize_id, "share_pub");
  },
};

export default postFavorite;
