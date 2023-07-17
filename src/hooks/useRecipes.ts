import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Recipe {
  recipe: {
    uri: string;
    label: string;
    image: string;
    url: string;
    source: string;
    ingredients: {
      text: string;
      quantity: number;
      measure: string;
    }[];
    images: {
      LARGE: {
        url: string;
      };
    };
    calories: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
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

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const [nextPageLink, setNextPageLink] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchRecipesResponse>(`?type=public&q=${searchText}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setRecipes(res.data.hits);
        setNextPageLink(res.data._links.next?.href || null);
        setHasNextPage(!!res.data._links.next);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [searchText, newRecipe]);

  const fetchNextPage = () => {
    if (nextPageLink) {
      fetchRecipes(nextPageLink);
    }
  };

  return { recipes, error, fetchNextPage, hasNextPage, isLoading, setLoading };
};

export default useRecipes;
