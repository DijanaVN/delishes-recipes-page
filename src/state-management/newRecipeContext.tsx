import React, { ReactNode, createContext, useContext } from "react";
import { Recipe } from "../hooks/useRecipes";
import { useLocalStorage } from "../hooks/useLocalStorage";

type NewRecipesContext = {
  newRecipes: Recipe[];
  setNewRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

type NewProviderProps = {
  children: ReactNode;
};

const NewRecipesContext = createContext<NewRecipesContext>({
  newRecipes: [],
  setNewRecipes: () => {},
});

export function useNewRecipes() {
  return useContext(NewRecipesContext);
}

export function NewRecipesProvider({ children }: NewProviderProps) {
  const [newRecipes, setNewRecipes] = useLocalStorage<Recipe[]>(
    "NewRecipesStorage",
    []
  );

  return (
    <NewRecipesContext.Provider
      value={{
        newRecipes,
        setNewRecipes,
      }}
    >
      {children}
    </NewRecipesContext.Provider>
  );
}
