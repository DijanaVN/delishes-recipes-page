import React from "react";
import { Recipe } from "../hooks/useRecipes";

interface selectetRecipeContext {
  selectedRecipe: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const newRecipeContext = React.createContext<selectetRecipeContext>(
  {} as selectetRecipeContext
);

export default newRecipeContext;
