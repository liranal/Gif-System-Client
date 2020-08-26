import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8321/api/",
  baseURL: "https://gif-system-server.herokuapp.com/api/",
});
