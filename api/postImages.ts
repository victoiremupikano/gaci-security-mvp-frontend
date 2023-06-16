import api from "./index";

declare type PostImagesAPIResponse = Record<string, any> & {
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

const PostImages = {
  async add(
    data: Record<string, any>,
    entreprize_id: string
  ): Promise<PostImagesAPIResponse> {
    return api.post(
      "/post-images-list-create/" + entreprize_id + "/",
      data,
      "share_pub"
    );
  },
  async update(
    data: Record<string, any>,
    id: string
  ): Promise<PostImagesAPIResponse> {
    return api.put("/post-images-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<PostImagesAPIResponse> {
    return api.delete("/post-images-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id: string): Promise<PostImagesAPIResponse> {
    return api.get("/post-images-list-create/" + entreprize_id, "share_pub");
  },
  async getByPost(
    id: string | number,
    entreprize_id: string
  ): Promise<PostImagesAPIResponse> {
    return api.get(
      "/post-images-post-detail/" + id + "/" + entreprize_id,
      "share_pub"
    );
  },
  async get(
    id: string | number,
    entreprize_id: string
  ): Promise<PostImagesAPIResponse> {
    return api.get(
      "/post-images-detail/" + id + "/" + entreprize_id,
      "share_pub"
    );
  },
};

export default PostImages;
