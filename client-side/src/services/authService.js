import JwtDecoder from "jwt-decode";
import axios from "../services/axiosConfig";

const tokenKey = "token";

export const login = async (email, password) => {
  const { data } = await axios.post("/api/auth", {
    email,
    password,
  });
  loginJwtLogin(data);
};

export const register = async (
  firstName,
  lastName,
  userName,
  age,
  role,
  email,
  password
) => {
  const { headers } = await axios.post("/api/register", {
    firstName,
    lastName,
    userName,
    age,
    role,
    email,
    password,
  });
  loginJwtLogin(headers["x-auth"]);
};

export const loginJwtLogin = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(tokenKey);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};
