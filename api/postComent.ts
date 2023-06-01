import api from "./index";

declare type PostComentAPIResponse = Record<string, any> & {
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

const PostComent = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<PostComentAPIResponse> {
    return api.post(
      "/coment-list-create/" + entreprize_id + "/", data, "share_pub"
    );
  },
  async update(data: Record<string, any>, id: string): Promise<PostComentAPIResponse> {
    return api.put("/coment-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<PostComentAPIResponse> {
    return api.delete("/coment-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id:string): Promise<PostComentAPIResponse> {
    return api.get("/coment-list-create/" + entreprize_id, "share_pub");
  },
  async getByPost(id:string | number, entreprize_id:string): Promise<PostComentAPIResponse> {
    return api.get("/coment-post-detail/" + id + "/" + entreprize_id, "share_pub");
  },
  async get(id:string | number, entreprize_id:string): Promise<PostComentAPIResponse> {
    return api.get("/coment-detail/" + id + "/" + entreprize_id, "share_pub");
  },
};

export default PostComent;
