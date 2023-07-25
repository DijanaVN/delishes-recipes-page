import React from "react";
import { Recipe } from "../hooks/useRecipes";

interface NewRecipeContext {
  newRecipe: Recipe | null;
  setNewRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const newRecipeContext = React.createContext<NewRecipeContext>(
  {} as NewRecipeContext
);

export default newRecipeContext;
