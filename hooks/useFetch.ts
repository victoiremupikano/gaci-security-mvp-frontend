import { useCallback, useEffect, useState } from "react";
import api from "../api/index";

declare type Method = "GET" | "POST" | "PUT";

export default function useFetch(
  url: string,
  method: Method = "GET",
  data?: any
) {
  const [result, setResult] = useState<any>();
  const fetch = useCallback(
    () => async () => {
      if (method === "GET") {
        const result = await api.get(url);
        setResult(result);
      }
      if (method === "POST") {
        const result = await api.post(url, data);
        setResult(result);
      }
      if (method === "PUT") {
        const result = await api.put(url, data);
        setResult(result);
      }
    },
    [method, url, data]
  );
  useEffect(() => {
    fetch();
  }, [fetch]);

  return result;
}
