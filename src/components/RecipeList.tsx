import {
  Image,
  Box,
  Text,
  Flex,
  useColorMode,
  Button,
  Center,
  List,
  ListItem,
} from "@chakra-ui/react";
import useRecipes, { Recipe } from "../hooks/useRecipes";
import "./../App.css";
import { useState } from "react";
import React from "react";

interface Props {
  onSelectRecipe: (recipe: Recipe) => void;
  searchText: string;
  newRecipe?: Recipe | null;
}

const RecipesList = ({ onSelectRecipe, searchText, newRecipe }: Props) => {
  const { searchQuery } = useRecipes(
    searchText,
    newRecipe as unknown as Recipe[]
  );

  console.log(searchQuery);

  const { colorMode, toggleColorMode } = useColorMode();

  console.log(searchQuery.data);
  const [hoveredRecipe, setHoveredRecipe] = useState<string | null>(null);
  const handleMouseEnter = (uri: string) => {
    setHoveredRecipe(uri);
  };
  const handleMouseLeave = () => {
    setHoveredRecipe(null);
  };
  return (
    <Box>
      {/* {searchQuery.error && (
        <Text color={colorMode === "dark" ? "#2292c3" : "black"}>
          {searchQuery.error.message}
        </Text>
      )} */}
      {searchQuery.isLoading && (
        <Center minHeight="100vh">
          <Button
            isLoading
            colorScheme="teal"
            variant="unstyled"
            loadingText="Loading..."
          />
        </Center>
      )}
      <List>
        {searchQuery.data?.pages.map((page, uri) => (
          <React.Fragment key={uri}>
            {page.map((recipe) => (
              <ListItem
                key={recipe.recipe.uri}
                onMouseEnter={() => handleMouseEnter(recipe.recipe.uri)}
                onMouseLeave={handleMouseLeave}
                className={hoveredRecipe === recipe.recipe.uri ? "hovered" : ""}
              >
                <Flex padding={1}>
                  <Button
                    padding={8}
                    onClick={() => {
                      onSelectRecipe(recipe);
                    }}
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
                        {recipe.recipe.cuisineType}
                      </Text>
                    </Box>
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
        {/* {searchQuery.data?.map((recipe: Recipe) => (
          
        ))} */}
      </List>{" "}
      <Flex padding={1} justifyContent="flex-end">
        {
          <Button onClick={() => searchQuery.fetchNextPage()}>
            {searchQuery.isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        }
      </Flex>
    </Box>
  );
};

export default RecipesList;
