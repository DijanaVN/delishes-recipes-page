import {
  Box,
  Button,
  Flex,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSelectedRecipe } from "./../state-management/selectedRecipeContext";
import image from "../../images-logos/brooke-lark-08bOYnH_r_E-unsplash.webp";
import ScrollToTopButton from "./ScroolToTheTopButton";
import { useState } from "react";
const NutritionDitails = () => {
  const { selectedRecipe } = useSelectedRecipe();
  const [showTotalDaily, setShowTotalDaily] = useState(true);

  const totalNutrientsData = showTotalDaily
    ? selectedRecipe?.recipe.totalDaily
    : selectedRecipe?.recipe.totalNutrients;

  if (!totalNutrientsData) {
    return null; // Handle case when totalNutrientsData is not available
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
        <Box color={"darkgreen"} padding={2} fontWeight={"bold"}>
          {showTotalDaily ? "Total Daily Nutrient" : "Total Nutrient"}
        </Box>
        <Switch
          padding={2}
          isChecked={showTotalDaily}
          onChange={() => setShowTotalDaily((prev) => !prev)}
          colorScheme={showTotalDaily ? "cyan" : "red"}
          style={{
            background: "rgba(200,10, 10, 0.1)",
          }}
        />{" "}
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
            {Object.keys(totalNutrientsData).map((nutrientKey) => {
              const nutrient = totalNutrientsData[nutrientKey];
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
