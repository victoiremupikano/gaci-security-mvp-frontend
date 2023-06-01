import api from "./index";

declare type PostAPIResponse = Record<string, any> & {
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

const Post = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<PostAPIResponse> {
    return api.post(
      "/post-list-create/" + entreprize_id + "/", data, "share_pub"
    );
  },
  async update(data: Record<string, any>, id: string): Promise<PostAPIResponse> {
    return api.put("/post-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<PostAPIResponse> {
    return api.delete("/post-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id:string): Promise<PostAPIResponse> {
    return api.get("/post-list-create/" + entreprize_id, "share_pub");
  },
  async get(id:string | number, entreprize_id:string): Promise<PostAPIResponse> {
    return api.get("/post-staff-detail/" + id + "/" + entreprize_id, "share_pub");
  },
};

export default Post;
