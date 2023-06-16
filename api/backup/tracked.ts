import api from "../index";

declare type BackupAPIResponse = Record<string, any> & {
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

const Tracked = {
  async get(): Promise<BackupAPIResponse> {
    return api.get("/tracked-list/", "mscm/backup");
  },
};

export default Tracked;
