import {
  Avatar,
  Image,
  Box,
  Text,
  Flex,
  useColorMode,
  useStyleConfig,
} from "@chakra-ui/react";
import useRecipes, { Recipe } from "../hooks/useRecipes";

const RecipesList = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { recipes, error } = useRecipes();
  const hoverColorStyle = useStyleConfig("RecipesList", {
    variant: "priary",
  });

  return (
    <>
      {" "}
      {error && (
        <Text color={colorMode === "dark" ? "#2292c3" : "black"}>{error} </Text>
      )}
      <ul>
        {recipes.map((recipe) => (
          <ul key={recipe.recipe.uri}>
            <Flex paddingBottom={2} sx={hoverColorStyle}>
              <Image
                boxSize="8%"
                borderRadius="full"
                src={recipe.recipe.image}
              />
              <Box marginLeft={2}>
                <Text>{recipe.recipe.label}</Text>
                <Text
                  color={colorMode === "dark" ? "primary" : "bluecolor"}
                  fontFamily={"Parisienne-Regular"}
                >
                  {recipe.recipe.cuisineType.map(
                    (m) => m.charAt(0).toUpperCase() + m.slice(1) + " recipe"
                  )}
                </Text>
              </Box>
            </Flex>
          </ul>
        ))}
      </ul>
    </>
  );
};

export default RecipesList;
