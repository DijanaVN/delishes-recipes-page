import React from "react";
import { Recipe } from "../hooks/useRecipes";

interface selectetRecipeContext {
  selectedRecipe: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const SelectedContext = React.createContext<selectetRecipeContext>({
  selectedRecipe: null,
  setSelectedRecipe: () => {},
});

export default SelectedContext;
