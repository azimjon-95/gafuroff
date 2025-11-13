import axios from "axios";

const mainURL = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://gafuroff-backend.medme.uz/api",
});

export default mainURL;
