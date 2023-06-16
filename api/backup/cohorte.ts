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

const Cohorte = {
  async get(): Promise<BackupAPIResponse> {
    return api.get("/cohorte-list/", "mscm/backup");
  },
};

export default Cohorte;
