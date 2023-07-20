import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.edamam.com/api/recipes/v2?type=public&q=",
  params: {
    app_id: "d7000eb6",
    app_key: "f0b37c8ae55d287364343e579aa5a494",
  },
});

export default apiClient;
