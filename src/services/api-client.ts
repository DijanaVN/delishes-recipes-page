import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.edamam.com/api/recipes/v2",
});

export default apiClient;
