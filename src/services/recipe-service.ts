import { Recipe } from "../hooks/useRecipes";
import apiClient from "./api-client";

export interface FetchRecipesResponse {
  from: number;
  to: number;
  count: number;
  _links: {
    self: {
      href: string;
      title: string;
    };
    next: {
      href: string;
      title: string;
    };
  };
  hits: Recipe[];
  searchText: string;
}

class RecipeService {
  getAllRecipesSearch(searchText: string) {
    const controller = new AbortController();
    const request = apiClient.get<FetchRecipesResponse>(
      `?type=public&q=${searchText}`,
      {
        signal: controller.signal,
      }
    );

    return { request, cancel: () => controller.abort() };
  }

  getLoadMoreRecipes(url: string) {
    return apiClient.get<FetchRecipesResponse>(url);
  }
}
export default new RecipeService();
