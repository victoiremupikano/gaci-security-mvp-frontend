import api from "./index";

const Auth = {
  verifyToken: async function () {
    const token = localStorage.getItem("access_token");
    const result = await api.post("/token/verify/", { token: token?.slice(7) });
    return result;
  },
  refreshToken: async function () {
    const token = localStorage.getItem("access_token");
    const result = await api.post("/token/verify/", { token });
    return result;
  },
  async logout() {
    return api.post("/logout/");
  },
};
export default Auth;
