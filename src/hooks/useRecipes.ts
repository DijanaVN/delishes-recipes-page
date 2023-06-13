import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Ingredients {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodId: string;
}
interface Large {
  url: string;
  width: number;
  height: number;
}
interface Images {
  LARGE: Large;
}

export interface Recipe {
  recipe: {
    uri: string;
    label: string;
    image: string;
    source: string;
    url: string;
    ingredients: Ingredients[];
    images: Images;
    calories: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    instructions: string[];
    tags: string[];
    searchText: string;
  };
}

interface FetchRecipesResponse {
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
}
const useRecipes = (searchText: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient.defaults.params = {
      ...apiClient.defaults.params,
      q: `${searchText}`,
      app_id: "d7000eb6",
      app_key: "f0b37c8ae55d287364343e579aa5a494",
    };
    apiClient
      .get<FetchRecipesResponse>(`?type=public&`)
      .then((res) => {
        setRecipes(res.data.hits);
      })
      .catch((err) => {
        setError(err.message);
      });
    return () => controller.abort();
  }, [searchText]);

  return { recipes, error };
};

export default useRecipes;
