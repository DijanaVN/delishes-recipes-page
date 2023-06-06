import { Text, useColorMode } from "@chakra-ui/react";
import useRecipes from "../hooks/useRecipes";

const RecipeGrid = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { recipes, error } = useRecipes();

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
