import api from "./index";

declare type postVideosAPIResponse = Record<string, any> & {
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

const postVideos = {
  async add(data: Record<string, any>, entreprize_id:string): Promise<postVideosAPIResponse> {
    return api.post(
      "/post-video-list-create/" + entreprize_id + "/", data, "share_pub"
    );
  },
  async update(data: Record<string, any>, id: string): Promise<postVideosAPIResponse> {
    return api.put("/post-video-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<postVideosAPIResponse> {
    return api.delete("/post-video-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id:string): Promise<postVideosAPIResponse> {
    return api.get("/post-video-list-create/" + entreprize_id, "share_pub");
  },
  async get(id:string | number, entreprize_id:string): Promise<postVideosAPIResponse> {
    return api.get("/post-video-detail/" + id + "/" + entreprize_id, "share_pub");
  },
};

export default postVideos;
