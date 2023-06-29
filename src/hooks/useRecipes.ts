import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Recipe {
  recipe: {
    uri: string;
    label: string;
    image: string;
    source: string;
    url: string;
    ingredients: {
      text: string;
      quantity: number;
      measure: string;
      food: string;
      weight: number;
      foodId: string;
    }[];
    images: {
      LARGE: {
        url: string;
        width: number;
        height: number;
      };
    };
    calories: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    instructions: string[];
    tags: string[];
    totalWeight: number;
    totalNutrients: {
      label: string;
      quantity: number;
      unit: string;
    };
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
const useRecipes = (searchText: string, newRecipe?: (Recipe | null)[]) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const [nextPageLink, setNextPageLink] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const fetchRecipes = async (url: string) => {
    try {
      const response = await apiClient.get<FetchRecipesResponse>(url);
      setRecipes((prevRecipes: Recipe[]) => [
        ...prevRecipes,
        ...response.data.hits,
      ]);
      setNextPageLink(response.data._links.next?.href || null);
    } catch (err: any) {
      setError(err.message);
    }
  };

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
        setNextPageLink(res.data._links.next?.href || null);
        setHasNextPage(!!res.data._links.next);
      })
      .catch((err) => {
        setError(err.message);
      });

    return () => controller.abort();
  }, [searchText, newRecipe]);

  const fetchNextPage = () => {
    if (nextPageLink) {
      fetchRecipes(nextPageLink);
    }
  };

  return { recipes, error, fetchNextPage, hasNextPage };
};

export default useRecipes;
