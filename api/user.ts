import api from "./index";

declare type UserAPIResponse = {
  type?: "success" | "error" | "auth";
  data?: any;
  status?: number;
  statusText?: string;
  token?: any;
  user?: any;
};

const User = {
  async login(email: string, password: string): Promise<UserAPIResponse> {
    return await api.post("/login/", { email, password });
  },
  async resetPassword(email: string) {
    return await api.post("/send-reset-password-email/", { email });
  },
  async addStaffUser(data: Record<string, any>): Promise<UserAPIResponse> {
    return await api.post("/staff-register-mscm/", data);
  },
  async addNoStaffUser(data: Record<string, any>): Promise<UserAPIResponse> {
    return await api.post("/no-staff-register-mscm/", data);
  },
  async updateUserDetails(data: Record<string, any>): Promise<UserAPIResponse> {
    return await api.post("/profile-list-create/", data);
  },
  async update(
    data: Record<string, any>,
    user_id: string
  ): Promise<UserAPIResponse> {
    return await api.put("/profile-update/" + user_id + "/", data);
  },
  async get(id: string) {
    return await api.get("/user-detail/" + id);
  },
  async changeStatus(data: Record<string, string | number | boolean>) {
    return await api.post("/changestatus/", data);
  },
  async getAll() {
    return await api.get("/user-list/");
  },
};

export default User;
