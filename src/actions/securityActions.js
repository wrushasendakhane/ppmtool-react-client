import axios from "axios"
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status >= 400) {
      console.log(err.response)
      throw new Error(JSON.stringify(err.response.data));
    }
    throw err;
  }
);
const SECURITY_API_URL = "/api/users"

export function register(user) {
  return axios.post(SECURITY_API_URL + "/register", user);
}

export function login(loginRequest) {
  return axios.post(SECURITY_API_URL + "/login", loginRequest);
}