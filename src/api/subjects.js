import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8321/api/",
});
