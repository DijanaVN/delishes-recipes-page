import { useEffect, useState } from "react";
import { Recipe } from "./useRecipes";
import React from "react";

export interface Props {
  selectedRecipe: Recipe | null;
  newRecipe?: Recipe | null;
  onB?: (bookmarkedRecipes: Recipe[]) => void;
}

export interface UseBookmarkedRecipesResult {
  toggleBookmark: () => void;
  isBookmarked: boolean;
  isBookmarkedValue: Recipe[];
  onB?: (bookmarkedRecipes: Recipe[]) => void;
}

const useBookmarkedRecipes = ({
  selectedRecipe,
  onB,
}: Props): UseBookmarkedRecipesResult => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkedValue, setIsBookmarkedValue] = useState<Recipe[]>([]);

  useEffect(() => {
    selectedRecipe
      ? setIsBookmarked(isBookmarkedValue.includes(selectedRecipe))
      : setIsBookmarked(false);
  }, [selectedRecipe, isBookmarkedValue]);

  useEffect(() => {
    if (onB) {
      onB(isBookmarkedValue);
    }
  }, [isBookmarkedValue, onB]);

  const toggleBookmark = () => {
    if (selectedRecipe) {
      if (isBookmarkedValue.includes(selectedRecipe)) {
        setIsBookmarkedValue((prevRecipes) =>
          prevRecipes.filter(
            (recipe) => recipe.recipe.uri !== selectedRecipe.recipe.uri
          )
        );
      } else {
        setIsBookmarkedValue((prevRecipes) => [...prevRecipes, selectedRecipe]);
      }
    }
  };

  // console.log(isBookmarkedValue);
  // console.log(selectedRecipe);

  return {
    toggleBookmark,
    isBookmarked,
    isBookmarkedValue,
  };
};

export default useBookmarkedRecipes;
