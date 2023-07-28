import React, { ReactNode, createContext, useContext } from "react";
import { Recipe } from "../hooks/useRecipes";
import { useLocalStorage } from "../hooks/useLocalStorage";

type NewRecipesContext = {
  newRecipes: Recipe[];
  setNewRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  removeRecipe: (uri: string) => void;
};

type NewProviderProps = {
  children: ReactNode;
};

const NewRecipesContext = createContext<NewRecipesContext>({
  newRecipes: [],
  setNewRecipes: () => {},
  removeRecipe: () => {},
});

export function useNewRecipes() {
  return useContext(NewRecipesContext);
}

export function NewRecipesProvider({ children }: NewProviderProps) {
  const [newRecipes, setNewRecipes] = useLocalStorage<Recipe[]>(
    "NewRecipesStorage",
    []
  );

  const removeRecipe = (uri: string) => {
    setNewRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.recipe.uri !== uri)
    );
  };

  return (
    <NewRecipesContext.Provider
      value={{
        newRecipes,
        setNewRecipes,
        removeRecipe,
      }}
    >
      {children}
    </NewRecipesContext.Provider>
  );
}
