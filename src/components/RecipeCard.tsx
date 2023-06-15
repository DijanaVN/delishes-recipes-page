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
  useColorMode,
  Grid,
} from "@chakra-ui/react";
import useRecipes, { Recipe } from "../hooks/useRecipes";
import recipe from "../../images-logos/image-recipe.webp";
import noimage from "../../images-logos/no-thumbnail-image-placeholder.webp";
import AddRecipeModal from "./AddRecipeModal";

interface Props {
  selectedRecipe: Recipe | null;
}

const RecipeCard = ({ selectedRecipe }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { error } = useRecipes("");
  const image = () => {
    if (selectedRecipe?.recipe.images?.LARGE?.url) {
      return selectedRecipe.recipe.images.LARGE.url;
    } else if (selectedRecipe?.recipe.image) {
      return selectedRecipe.recipe.image;
    } else {
      return noimage;
    }
  };

  return (
    <>
      {" "}
      {error && (
        <Text color={colorMode === "dark" ? "#2292c3" : "black"}>{error} </Text>
      )}
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
            <Heading textAlign="center" size="md">
              {selectedRecipe
                ? selectedRecipe.recipe.label
                : "Please search and select a recipe."}
            </Heading>
            <Divider />
            <Text padding={2} textAlign={"center"} fontWeight={"bold"}>
              {selectedRecipe?.recipe.ingredients ? "RECIPE INGREDIENTS:" : ""}
            </Text>
            <Text paddingBottom={2} paddingLeft={10} textAlign="start">
              {selectedRecipe?.recipe.ingredients && (
                <Grid
                  templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                  gap={4}
                >
                  {selectedRecipe.recipe.ingredients.map((m, index) => (
                    <li key={index}>{m.text}</li>
                  ))}
                </Grid>
              )}
            </Text>
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
      </Card>
    </>
  );
};

export default RecipeCard;
