import axios from "axios";

interface Credenciales {
  email: string;
  password: string;
}

interface Email {
  email: string;
}

export const checkUser = async () =>
  await axios.get("http://localhost:4000/api/checkUserDB");

export const logout = async () =>
  await axios.get("http://localhost:4000/api/onLogout");

export const loginByPassword = async (credenciales: Credenciales) =>
  await axios.post("http://localhost:4000/api/onLogin/password", credenciales);

export const loginByMagicLink = async (email: Email) =>
  await axios.post("http://localhost:4000/api/onLogin/magic-link", email);

export const register = async (credenciales: Credenciales) =>
  await axios.post("http://localhost:4000/api/onRegister", credenciales);
