import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://localhost:3000/api/v1",
});

export default baseApi;
