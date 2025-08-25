import axios from "axios";

const mainURL = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://afzal.richman.uz/api",
});

export default mainURL;
