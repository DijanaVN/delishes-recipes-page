import React, { ReactNode, createContext, useContext, useState } from "react";
import { Recipe } from "../hooks/useRecipes";

type SelectedContext = {
  selectedRecipe: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
};

type SelectedContextProps = {
  children: ReactNode;
};

const SelectedContext = createContext<SelectedContext>({
  selectedRecipe: null,
  setSelectedRecipe: () => {},
});

export function useSelectedRecipe() {
  return useContext(SelectedContext);
}

export function SelectedRecipeProvider({ children }: SelectedContextProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <SelectedContext.Provider
      value={{
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      {children}
    </SelectedContext.Provider>
  );
}
