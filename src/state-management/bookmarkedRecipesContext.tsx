import { ReactNode, createContext, useContext, useState } from "react";
import { Recipe } from "../hooks/useRecipes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import React from "react";
type bookmarkedRecipesContext = {
  bookmarkedRecipes: Recipe[];
  addBookmark: (uri: string, combinedRecipes: Recipe[]) => void;
  removeBookmark: (uri: string) => void;
  setBookmarkedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  isBookmarked: boolean;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
};

type bookmarkedProviderProps = {
  children: ReactNode;
};

const bookmarkedRecipesContext = createContext<bookmarkedRecipesContext>({
  bookmarkedRecipes: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  setBookmarkedRecipes: () => {},
  isBookmarked: false,
  setIsBookmarked: () => {},
});

export function useBookmarkedRecipes() {
  return useContext(bookmarkedRecipesContext);
}

export function BookmarkedRecipesProvider({
  children,
}: bookmarkedProviderProps) {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useLocalStorage<Recipe[]>(
    "RecipesStorage",
    []
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  function addBookmark(uri: string, combinedRecipes: Recipe[]) {
    const isAlreadyBookmarked = bookmarkedRecipes.some(
      (r) => r.recipe.uri === uri
    );

    if (!isAlreadyBookmarked) {
      setIsBookmarked(true);
      const recipeToAdd = combinedRecipes.find((r) => r.recipe.uri === uri);

      if (recipeToAdd) {
        setBookmarkedRecipes((prevBookmarkedRecipes) => [
          ...prevBookmarkedRecipes,
          recipeToAdd,
        ]);
      }
    }
  }

  function removeBookmark(uri: string) {
    setIsBookmarked(false);

    setBookmarkedRecipes((prevBookmarkedRecipes) =>
      prevBookmarkedRecipes.filter((r) => r.recipe.uri !== uri)
    );
  }

  return (
    <bookmarkedRecipesContext.Provider
      value={{
        bookmarkedRecipes,
        addBookmark,
        removeBookmark,
        setBookmarkedRecipes,
        isBookmarked,
        setIsBookmarked,
      }}
    >
      {children}
    </bookmarkedRecipesContext.Provider>
  );
}
