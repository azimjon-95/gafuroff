import axios from "axios";

const mainURL = axios.create({
  baseURL: "https://gafuroff-branch-backend.medme.uz/api",
});

export default mainURL;
