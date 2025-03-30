import axios from "axios";

export const postMessage = async (message: string) =>
  await axios.post(`http://localhost:8080/api/publicar/${message}`);

export const getMessages = async () =>
  await axios.get("http://localhost:8080/api/listar");
