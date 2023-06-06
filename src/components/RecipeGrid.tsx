import { useEffect, useState } from "react";
import { Text, useColorMode } from "@chakra-ui/react";
import apiClient, { app_id, app_key, query } from "../services/api-client";

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

const RecipeGrid = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
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
  }, []);

  return (
    <>
      {error && (
        <Text color={colorMode === "dark" ? "#2292c3" : "black"}>{error} </Text>
      )}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipe.uri}>{recipe.recipe.label}</li>
        ))}
      </ul>
    </>
  );
};

export default RecipeGrid;
