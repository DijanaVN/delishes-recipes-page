import { Image, Box, Text, Flex, useColorMode, Button } from "@chakra-ui/react";
import useRecipes, { Recipe } from "../hooks/useRecipes";
import "./../App.css";
import { useEffect, useState } from "react";

interface Props {
  onSelectRecipe: (recipe: Recipe) => void;
  searchText: string;
  newRecipe?: Recipe | null;
}

const RecipesList = ({ onSelectRecipe, searchText, newRecipe }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { recipes, error, fetchNextPage, hasNextPage } = useRecipes(
    searchText,
    newRecipe
  );

  const [hoveredRecipe, setHoveredRecipe] = useState<string | null>(null);
  const [updatedRecipes, setUpdatedRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    setUpdatedRecipes(recipes || []);
    if (newRecipe) {
      setUpdatedRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    } else if (searchText !== "") {
      setUpdatedRecipes(recipes);
    }
    console.log(recipes);
    console.log(updatedRecipes);
  }, [newRecipe, recipes, searchText]);

  const handleMouseEnter = (uri: string) => {
    setHoveredRecipe(uri);
  };

  const handleMouseLeave = () => {
    setHoveredRecipe(null);
  };

  return (
    <Box>
      {error && (
        <Text color={colorMode === "dark" ? "#2292c3" : "black"}>{error} </Text>
      )}
      <ul>
        {updatedRecipes.map((recipe) => (
          <li
            key={recipe.recipe.uri}
            onMouseEnter={() => handleMouseEnter(recipe.recipe.uri)}
            onMouseLeave={handleMouseLeave}
            // className={hoveredRecipe === recipe.recipe.uri ? "hovered" : ""}
          >
            <Flex padding={1}>
              <Button
                padding={8}
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
                  width="14"
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
                    align={"left"}
                  >
                    {recipe.recipe.cuisineType.map(
                      (m) => m.charAt(0).toUpperCase() + m.slice(1) + " recipe"
                    )}
                  </Text>
                </Box>
              </Button>
            </Flex>
          </li>
        ))}
      </ul>{" "}
      <Flex padding={1} justifyContent="flex-end">
        {hasNextPage && <Button onClick={fetchNextPage}>Load More</Button>}
      </Flex>
    </Box>
  );
};

export default RecipesList;
