import { ResponseGlobal } from "../types";
import api from "./index";

declare type UserAPIResponse = {
  type?: "success" | "error" | "auth";
  data?: any;
  status?: number;
  statusText?: string;
  token?: any;
  user?: any;
} & ResponseGlobal

const Profile = {
  async create(data: Record<string, any>): Promise<UserAPIResponse> {
    return api.post("/profile-list-create/", data);
  },
  async update(
    data: Record<string, any>,
    user_id: string | number
  ): Promise<UserAPIResponse> {
    return api.put("/profile-update/" + user_id + "/", data);
  },
  async get(id: string) {
    return api.get("/profile-detail/" + id);
  },
  async getUserLogged() {
    return api.get("/profile-user-logged/");
  },
  async delete(id: string) {
    return api.delete("/profile-delete/" + id);
  },
  async getAll() {
    return api.get("/profile-list-create/");
  },
};

export default Profile
