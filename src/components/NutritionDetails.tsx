import {
  Box,
  List,
  ListItem,
  Image,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import { useSelectedRecipe } from "./../state-management/selectedRecipeContext";
import image from "../../images-logos/brooke-lark-08bOYnH_r_E-unsplash.webp";
import { useState } from "react";
import ScrollToTopButton from "./ScroolToTheTopButton";
const NutritionDitails = () => {
  const { selectedRecipe } = useSelectedRecipe();
  const totalNutrients = selectedRecipe?.recipe.totalNutrients;

  if (!totalNutrients) {
    return null; // Handle case when totalNutrients is not available
  }

  const backgroundStyle = {
    backgroundImage: selectedRecipe ? `url(${image})` : "lightgreen",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    borderRadius: "lg",
  };

  return (
    <Box style={backgroundStyle} height="100%" width="100%" borderRadius="lg">
      <Flex justifyContent={"flex-end"}>
        <Table
          variant="simple"
          colorScheme="green"
          color={"GrayText"}
          size="md"
          width="60%"
        >
          <Thead>
            <Tr>
              <Th fontSize="xl" color={"darkgreen"}>
                Nutrient
              </Th>
              <Th fontSize="xl" color={"darkgreen"}>
                Quantity
              </Th>
              <Th fontSize="xl" color={"darkgreen"}>
                Unit
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(totalNutrients).map((nutrientKey) => {
              const nutrient = totalNutrients[nutrientKey];
              const formattedQuantity = nutrient.quantity.toFixed(2);
              return (
                <Tr key={nutrientKey}>
                  <Td fontSize="lg" fontWeight={"bold"}>
                    {nutrient.label}
                  </Td>
                  <Td>{formattedQuantity}</Td>
                  <Td>{nutrient.unit}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <ScrollToTopButton />
      </Flex>
    </Box>
  );
};

export default NutritionDitails;
