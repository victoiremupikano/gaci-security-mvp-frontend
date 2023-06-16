import api from "./index";

declare type PostDocsAPIResponse = Record<string, any> & {
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

const PostDocs = {
  async add(
    data: Record<string, any>,
    entreprize_id: string
  ): Promise<PostDocsAPIResponse> {
    return api.post(
      "/post-docs-list-create/" + entreprize_id + "/",
      data,
      "share_pub"
    );
  },
  async update(
    data: Record<string, any>,
    id: string
  ): Promise<PostDocsAPIResponse> {
    return api.put("/post-docs-update/" + id + "/", data, "share_pub");
  },
  async delete(id: string): Promise<PostDocsAPIResponse> {
    return api.delete("/post-docs-delete/" + id + "/", "share_pub");
  },
  async getAll(entreprize_id: string): Promise<PostDocsAPIResponse> {
    return api.get("/post-docs-list-create/" + entreprize_id, "share_pub");
  },
  async getByPost(
    id: string | number,
    entreprize_id: string
  ): Promise<PostDocsAPIResponse> {
    return api.get(
      "/post-docs-post-detail/" + id + "/" + entreprize_id,
      "share_pub"
    );
  },
  async get(
    id: string | number,
    entreprize_id: string
  ): Promise<PostDocsAPIResponse> {
    return api.get(
      "/post-docs-detail/" + id + "/" + entreprize_id,
      "share_pub"
    );
  },
};

export default PostDocs;
