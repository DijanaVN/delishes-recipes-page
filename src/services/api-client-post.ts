import axios from "axios";

const apiClientPost = axios.create({
  baseURL: "https://api.edamam.com/api/recipe-book/v1/{app-id}/draft",
  params: {
    app_id: "4e966b11",
    app_key: "713b4866d1f025073785750b7dc39fe7",
  },
});

export default apiClientPost;
