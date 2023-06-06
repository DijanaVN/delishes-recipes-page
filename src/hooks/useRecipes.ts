import { useEffect, useState } from "react";
import apiClient, { query, app_id, app_key } from "../services/api-client";
interface Recipe {
  recipe: {
    uri: string;
    label: string;
    image: string;

    ingredients: {
      text: string;
      quantity: number;
      measure: string;
      food: string;
      weight: number;
      foodId: string;
    }[];
    calories: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    instructions: string[];
    tags: string[];
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
const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FetchRecipesResponse>(
        `?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
      })
      .catch((err) => {
        setError(err.message);
      });
    return () => controller.abort();
  }, []);
  return { recipes, error };
};

export default useRecipes;
