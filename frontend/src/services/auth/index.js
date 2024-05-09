import { BASE_URL, post } from "services/utils";
import { refreshCookie } from "utils/auth";

const PATHS = {
  login: `v1/auth/login/`,
  logout: `v1/auth/logout/`,
  register: `v1/auth/register`,
}

export async function login(body){
  return post(`${BASE_URL}/${PATHS.login}`, body);
}

export async function logout(){
  const refreshToken = refreshCookie();
  return post(`${BASE_URL}/${PATHS.logout}`, {refreshToken})
}

export async function register(body){
  return post(`${BASE_URL}/${PATHS.register}`, body)
}
