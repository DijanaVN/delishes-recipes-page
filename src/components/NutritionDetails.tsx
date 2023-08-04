import { Box } from "@chakra-ui/react";
import { useSelectedRecipe } from "./../state-management/selectedRecipeContext";
const NutritionDitails = () => {
  const { selectedRecipe } = useSelectedRecipe();

  console.log(selectedRecipe);
  return (
    <>
      <Box>Nutrition Details</Box>
    </>
  );
};

export default NutritionDitails;
