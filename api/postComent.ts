import api from "./index";

declare type PostDocsAPIResponse = Record<string, any> & {
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

const PostComment = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<PostDocsAPIResponse> {
    return api.post(
      "/comment-list-create/" + entreprize_id + "/", data, "share_pub"
    );
  },
  async update(data: Record<string, any>, id: string): Promise<PostDocsAPIResponse> {
    return api.put("/comment-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<PostDocsAPIResponse> {
    return api.delete("/comment-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id:string): Promise<PostDocsAPIResponse> {
    return api.get("/comment-list-create/" + entreprize_id, "share_pub");
  },
  async getByPost(id:string | number, entreprize_id:string): Promise<PostDocsAPIResponse> {
    return api.get("/comment-post-detail/" + id + "/" + entreprize_id, "share_pub");
  },
  async get(id:string | number, entreprize_id:string): Promise<PostDocsAPIResponse> {
    return api.get("/comment-detail/" + id + "/" + entreprize_id, "share_pub");
  },
};

export default PostComment;
