import axios, { AxiosError } from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://sma.herokuapp.com/api/"
    : "http://localhost:8000/api/";

const headers =
  process.env.NODE_ENV === "production"
    ? {
        "Access-Control-Allow-Origin": "*",
      }
    : {};

export const instance = axios.create({
  baseURL,
  headers,
});
const endpoint = {
  /**\import-js\eslint-plugin-import\blob\v2.26.0\docs\rules\no-anonymous-default-export.md
   * Gets data from the api using GET HTTP Method
   * @param {string} path endpoint on the server
   * @returns {Promise<AxiosResponse.data}
   */
  async get(path: string, prefix = "auth") {
    try {
      const response = await instance.get(prefix + path);
      if (Array.isArray(response.data))
        return { results: response.data, statusCode: response.status };
      else return { ...response.data, statusCode: response.status };
    } catch (e: any) {
      return {
        type: "error",
        data: e.response.data,
        message: e.response.statusText,
        code: e.response.status,
      };
    }
  },
  /**
   * Gets data from the api using POST HTTP Method
   * @param {string} path endpoint on the server
   * @param {Record<string, string|number|symbol>} body Request Body
   * @@returns {Promise<AxiosResponse.data}
   */
  async post(path: string, body = {}, prefix = "auth") {
    try {
      const response = await instance.post(prefix + path, body);
      return response.data;
    } catch (e: any) {
      return {
        type: "error",
        data: e.response.data,
        message: e.response.statusText,
        code: e.response.status,
      };
    }
  },
  /**
   * Sends data from the api using PUT HTTP Method
   * @param {string} path endpoint on the server
   * @param {Record<string, string|number|symbol>} body Request Body
   * @@returns {Promise<AxiosResponse.data}
   */
  async put(path: string, body = {}, prefix = "auth") {
    try {
      const response = await instance.put(prefix + path, body);
      return response.data;
    } catch (e: any) {
      return {
        type: "error",
        data: e.response.data,
        message: e.response.statusText,
        code: e.response.status,
      };
    }
  },
  /**
   * Sends data to delete using the delete method
   * @param {string} path endpoint on the server
   * @param {string} prefix the api prefix parameter
   * @@returns {Promise<AxiosResponse.data}
   */
  async delete(path: string, prefix = "auth") {
    try {
      const response = await instance.delete(prefix + path);
      return response.data;
    } catch (e: any) {
      return {
        type: "error",
        data: e.response.data,
        message: e.response.statusText,
        code: e.response.status,
      };
    }
  },
};

export default endpoint;
