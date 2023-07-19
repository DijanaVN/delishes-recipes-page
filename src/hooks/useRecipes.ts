import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import recipeService from "../services/recipe-service";
import { useQuery } from "@tanstack/react-query";

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
  // useQuery({
  //   queryKey:['recipes'],
  //   queryFn:()
  // });

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const [nextPageLink, setNextPageLink] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [updatedRecipes, setUpdatedRecipes] = useState<Recipe[]>(recipes || []);

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

  useEffect(() => {
    setUpdatedRecipes(recipes || []);
    if (newRecipe) {
      setUpdatedRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    } else if (searchText !== "") {
      setUpdatedRecipes(recipes || []);
    }
    // console.log(recipes);
    // console.log(updatedRecipes);
  }, [newRecipe, recipes, searchText]);

  return {
    recipes,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    setLoading,
    updatedRecipes,
  };
};

export default useRecipes;
