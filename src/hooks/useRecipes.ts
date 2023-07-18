import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import recipeService, {
  FetchRecipesResponse,
} from "../services/recipe-service";

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

const useRecipes = (searchText: string, newRecipe?: (Recipe | null)[]) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const [nextPageLink, setNextPageLink] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = recipeService.getAllRecipesSearch(searchText);

    request
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
    return () => cancel();
  }, [searchText, newRecipe]);

  const fetchRecipes = (url: string) => {
    recipeService
      .getLoadMoreRecipes(url)
      .then((res) => {
        setRecipes((prevRecipes: Recipe[]) => [
          ...prevRecipes,
          ...res.data.hits,
        ]);
        setNextPageLink(res.data._links.next?.href || null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const fetchNextPage = () => {
    if (nextPageLink) {
      fetchRecipes(nextPageLink);
    }
  };

  return { recipes, error, fetchNextPage, hasNextPage, isLoading, setLoading };
};

export default useRecipes;
