import { Image, Box, Text, Flex, useColorMode, Button } from "@chakra-ui/react";
import useRecipes, { Recipe } from "../hooks/useRecipes";

interface Props {
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipesList = ({ onSelectRecipe }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { recipes, error } = useRecipes();

  return (
    <Box>
      {" "}
      {error && (
        <Text color={colorMode === "dark" ? "#2292c3" : "black"}>{error} </Text>
      )}
      <ul>
        {recipes.map((recipe) => (
          <ul key={recipe.recipe.uri}>
            <Flex>
              <Button
                onClick={() => onSelectRecipe(recipe)}
                variant={"solid"}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="left"
                backgroundColor="light"
                width="100%"
                borderRadius="none"
              >
                <Box
                  width="8"
                  borderRadius="50%"
                  overflow="hidden"
                  marginRight={5}
                >
                  <Image
                    boxSize="100%"
                    objectFit="cover"
                    src={recipe.recipe.image}
                    alt={recipe.recipe.label}
                  />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  fontSize={{ base: "xs", md: "md", lg: "lg" }}
                >
                  <Text>
                    {recipe.recipe.label.length > 25
                      ? recipe.recipe.label.slice(0, 25).concat("...")
                      : recipe.recipe.label}
                  </Text>
                  <Text
                    color={colorMode === "dark" ? "primary" : "bluecolor"}
                    fontFamily={"Parisienne-Regular"}
                  >
                    {recipe.recipe.cuisineType.map(
                      (m) => m.charAt(0).toUpperCase() + m.slice(1) + " recipe"
                    )}
                  </Text>
                </Box>
              </Button>
            </Flex>
          </ul>
        ))}
      </ul>
    </Box>
  );
};

export default RecipesList;
