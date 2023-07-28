import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Divider,
  CardFooter,
  Button,
  Flex,
  Image,
  Grid,
  HStack,
} from "@chakra-ui/react";
import recipe from "../../images-logos/image-recipe.webp";
import noimage from "../../images-logos/no-thumbnail-image-placeholder.webp";
import { useContext } from "react";
import { useNewRecipes } from "./../state-management/newRecipeContext";
import selectedRecipeContext from "../state-management/selectedRecipeContext";

import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import searchTextContext from "../state-management/searchTextContext";
import useRecipes from "../hooks/useRecipes";
import { useBookmarkedRecipes } from "../state-management/bookmarkedRecipesContext";

const RecipeCard = () => {
  const { newRecipes } = useNewRecipes();
  const { selectedRecipe } = useContext(selectedRecipeContext);
  const { searchText } = useContext(searchTextContext);
  const { combinedRecipes } = useRecipes(searchText);
  const { bookmarkedRecipes, addBookmark, removeBookmark, isBookmarked } =
    useBookmarkedRecipes();
  console.log(bookmarkedRecipes);
  console.log(combinedRecipes);
  console.log(isBookmarked);

  const isRecipeBookmarked =
    selectedRecipe &&
    bookmarkedRecipes.some((r) => r.recipe.uri === selectedRecipe.recipe.uri);

  const handleBookmark = () => {
    if (selectedRecipe) {
      if (isRecipeBookmarked) {
        removeBookmark(selectedRecipe.recipe.uri);
      } else {
        addBookmark(selectedRecipe.recipe.uri, combinedRecipes);
      }
    }
  };

  const image = () => {
    if (selectedRecipe?.recipe.images?.LARGE?.url) {
      return selectedRecipe.recipe.images.LARGE.url;
    } else if (selectedRecipe?.recipe.image) {
      return selectedRecipe.recipe.image;
    } else {
      return noimage;
    }
  };

  const isRecipeInNewRecipes =
    selectedRecipe &&
    newRecipes.some(
      (recipe) => recipe.recipe.uri === selectedRecipe.recipe.uri
    );

  return (
    <>
      <Card>
        <CardBody>
          <Flex justifyContent="center" alignItems="center">
            <Image
              objectFit={"cover"}
              height={"60vh"}
              width={"100%"}
              src={selectedRecipe ? image() : recipe}
              alt={selectedRecipe?.recipe.label}
              borderRadius="lg"
            />
          </Flex>

          <Stack mt="6" spacing="3">
            <HStack spacing={10} justifyContent={"center"}>
              <Heading textAlign="center" size="md">
                {selectedRecipe
                  ? selectedRecipe.recipe.label
                  : "Please search and select a recipe."}
              </Heading>
              {selectedRecipe && (
                <Button
                  variant={"ghost"}
                  onClick={handleBookmark}
                  css={{ outline: "none" }}
                >
                  {isRecipeBookmarked ? (
                    <BsBookmarkFill fontSize="100%" />
                  ) : (
                    <BsBookmark fontSize="100%" />
                  )}
                </Button>
              )}
            </HStack>
            <Divider />
            <Text padding={2} textAlign={"center"} fontWeight={"bold"}>
              {selectedRecipe?.recipe.ingredients ? "RECIPE INGREDIENTS:" : ""}
            </Text>
            <div
              style={{ paddingBottom: 2, paddingLeft: 10, textAlign: "start" }}
            >
              {selectedRecipe?.recipe.ingredients && (
                <Grid
                  templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                  gap={4}
                >
                  {selectedRecipe.recipe.ingredients.map((m, index) => (
                    <li key={index}>
                      <span style={{ fontSize: 18 }}>{m.text}</span> , <br /> -
                      quantity: {m.quantity} ,
                      <br />- measure: {m.measure}
                    </li>
                  ))}
                </Grid>
              )}
            </div>
            <Divider />
            <Text padding={2}>
              {selectedRecipe?.recipe.mealType && (
                <>
                  <i>Meal type</i>: {selectedRecipe.recipe.mealType}
                </>
              )}
            </Text>
            <Divider />{" "}
            <Text padding={2}>
              {selectedRecipe?.recipe.dishType && (
                <>
                  <i>Dish type</i>: {selectedRecipe.recipe.dishType}
                </>
              )}
            </Text>
            <Divider />{" "}
            <Text padding={2}>
              {selectedRecipe?.recipe.calories && (
                <>
                  <i>Calories</i>: {selectedRecipe.recipe.calories.toFixed(0)}{" "}
                  kcal.
                </>
              )}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        {selectedRecipe && !isRecipeInNewRecipes && (
          <CardFooter justifyContent="center" textAlign="center">
            <Flex flexDirection={"column"} align={"center"}>
              <Text>
                This recipe was carefully designed and tested by{" "}
                {selectedRecipe
                  ? selectedRecipe.recipe.source
                  : "(please choose a recipe)"}
                . Please check out directions at their website.
              </Text>
              <Button
                onClick={() =>
                  selectedRecipe?.recipe.url
                    ? window.open(selectedRecipe.recipe.url)
                    : " "
                }
                padding={2}
                marginTop={5}
                boxSize={"35%"}
                variant="solid"
                colorScheme="blue"
                fontSize={{ base: "xs", md: "md", lg: "lg" }}
              >
                Direction ▶
              </Button>
            </Flex>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default RecipeCard;
