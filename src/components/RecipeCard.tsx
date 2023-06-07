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
} from "@chakra-ui/react";
import { Recipe } from "../hooks/useRecipes";
import recipe from "../../images-logos/image-recipe.webp";

interface Props {
  selectedRecipe: Recipe | null;
}

const RecipeCard = ({ selectedRecipe }: Props) => {
  return (
    <>
      <Card>
        <CardBody>
          <Flex justifyContent="center" alignItems="center">
            <Image
              objectFit={"cover"}
              height={"50vh"}
              width={"100%"}
              src={selectedRecipe?.recipe.image}
              alt={selectedRecipe?.recipe.label}
              borderRadius="lg"
            />
          </Flex>

          <Stack mt="6" spacing="3">
            <Heading textAlign="center" size="md">
              {selectedRecipe ? (
                selectedRecipe.recipe.label
              ) : (
                <Image src={recipe} borderRadius="lg" />
              )}
            </Heading>
            <Text paddingLeft={10} textAlign="start">
              {selectedRecipe?.recipe.ingredients.map((m) => (
                <li key={m.foodId}>{m.text}</li>
              ))}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex
            justifyItems={"center"}
            flexDirection={"column"}
            align={"center"}
          >
            <Text justifyContent="center" textAlign="center">
              This recipe was carefully designed and tested by{" "}
              {selectedRecipe
                ? selectedRecipe.recipe.source
                : "(please choose a recipe)"}
              . Please check out directions at their website.
            </Text>
            <Button
              justifyContent="center"
              textAlign="center"
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
              Direction ---{">"}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecipeCard;
