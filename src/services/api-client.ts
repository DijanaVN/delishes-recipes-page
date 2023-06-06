import axios from "axios";
export const query = "pizza";
export const app_id = "d7000eb6";
export const app_key = "f0b37c8ae55d287364343e579aa5a494";

export default axios.create({
  baseURL: "https://api.edamam.com/api/recipes/v2",
  params: {
    q: query,
    id: app_id,
    key: app_key,
  },
});
