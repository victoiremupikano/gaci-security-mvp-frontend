import api from "../api";

declare type Method = "GET" | "POST" | "PUT";

export default async function fetch(
  url: string,
  prefix?: string,
  method: Method = "GET",
  data?: any
): Promise<any> {
  if (method === "GET") return await api.get(url, prefix);
  if (method === "POST") return await api.post(url, data, prefix);
  if (method === "PUT") return await api.put(url, data, prefix);
}
