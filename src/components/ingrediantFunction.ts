import { FieldValues } from "react-hook-form";

export const ingrediantObjectFunction = (data: FieldValues) => {
  const ingredientsObject = {
    text: data.recipe.ingredients[0],
    quantity: Number(data.recipe.ingredients[1]),
    measure: data.recipe.ingredients[2],
  };
  const updatedData = {
    ...data,
    recipe: {
      ...data.recipe,
      ingredients: [ingredientsObject],
    },
  };
  return updatedData;
};
