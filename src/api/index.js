import axios from "axios";

const mainURL = axios.create({
  baseURL: "http://localhost:8040/api",
  // baseURL: "https://medme-b-test.medme.uz/api",
});

export default mainURL;
