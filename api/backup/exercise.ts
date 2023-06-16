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

const Exercise = {
  async get(): Promise<BackupAPIResponse> {
    return api.get("/exercise-list/", "mscm/backup");
  },
};

export default Exercise;
