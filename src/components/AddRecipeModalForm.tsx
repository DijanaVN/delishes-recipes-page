import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import ownrecipe from "../../images-logos/yourownrecipeslg.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useNewRecipes } from "../state-management/newRecipeContext";
import { Recipe } from "../hooks/useRecipes";
import ScrollToTopButton from "./ScroolToTheTopButton";

const ingredientSchema = z.object({
  text: z.string().nonempty({ message: "Ingredient field is required." }),
  quantity: z
    .number({ invalid_type_error: "Quantity field is required." })
    .nullable()
    .refine(
      (val) => {
        if (val === null) return true; // Quantity can be null (empty)
        const isNumber = !isNaN(val);
        return isNumber ? val >= 0 : false;
      },
      { message: "Quantity must be a number and cannot be negative." }
    ),
  measure: z.string().nonempty({ message: "Measure field is required." }),
});
const recipeSchema = z.object({
  recipe: z.object({
    uri: z.string(),
    label: z
      .string()
      .min(3, { message: "Title needs to be at least 3 characters." }),
    ingredients: z.array(ingredientSchema),
    image: z.string(),
    calories: z.number({ invalid_type_error: "Calories field is required." }),
    cuisineType: z
      .string()
      .min(3, { message: "Cuisine Type needs to be at least 3 characters." }),
    mealType: z
      .string()
      .min(3, { message: "Meal Type needs to be at least 3 characters." }),
    dishType: z
      .string()
      .min(3, { message: "Dish Type needs to be at least 3 characters." }),
  }),
});

type FormData = z.infer<typeof recipeSchema>;

const AddRecipeModal = () => {
  const { newRecipes, setNewRecipes } = useNewRecipes();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUploaded, setIsUploaded] = useState(false);
  const {
    isOpen: isSuccessModalOpen,
    onOpen: openSuccessModal,
    onClose: closeSuccessModal,
  } = useDisclosure();

  const generateRandomUniqueUri = (): string => {
    const timestamp = Date.now(); // Get the current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const uri = `${timestamp}${randomNum}`; // Concatenate the timestamp and random number
    return uri;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      recipe: {
        uri: generateRandomUniqueUri(),
        image: ownrecipe,
        ingredients: [{ text: "", quantity: undefined, measure: "" }],
      },
    },
  });

  const ingrediantObjectFunction = (data: FieldValues): Recipe => {
    const ingredientsObject = data.recipe.ingredients.map(
      (ingredient: z.infer<typeof ingredientSchema>) => ({
        text: ingredient.text,
        quantity: ingredient.quantity || null,
        measure: ingredient.measure,
      })
    );
    const updatedData = {
      ...data,
      recipe: {
        ...data.recipe,
        ingredients: ingredientsObject,
      },
    };
    return updatedData;
  };
  const addIngredient = () => {
    setValue("recipe.ingredients", [
      ...watch("recipe.ingredients"),
      { text: "", quantity: null, measure: "" },
    ]);
  };

  const onSubmit = (data: FieldValues) => {
    const newRecipe = ingrediantObjectFunction(data);
    setNewRecipes((prevRecipes) => [...prevRecipes, newRecipe]);

    setIsUploaded(true);
    openSuccessModal();
    onClose();
    reset();
  };

  const handleSuccessModalClose = () => {
    setIsUploaded(false);
    closeSuccessModal();
  };
  console.log(newRecipes);
  return (
    <>
      <Button rounded="full" onClick={onOpen}>
        <BsPencilSquare fontSize="100%" />
        <Text paddingLeft={2}>Add Recipe</Text>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="1px"
        />
        <ModalContent>
          <ModalHeader>
            {" "}
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody pb={6}>
            {isUploaded && (
              <Text color="green" mb={4}>
                Recipe successfully uploaded!
              </Text>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl padding={2}>
                <FormLabel>RECIPE DATA</FormLabel>
                <Input
                  defaultValue={ownrecipe}
                  {...register("recipe.image")}
                  type="hidden"
                />
                <Input
                  defaultValue={generateRandomUniqueUri()}
                  {...register("recipe.uri")}
                  type="hidden"
                />
                <Input
                  {...register("recipe.label")}
                  placeholder="Title"
                  mb={2}
                />
                {errors.recipe?.label && (
                  <Text color="red">{errors.recipe.label.message}</Text>
                )}
                <Input
                  {...register("recipe.cuisineType")}
                  placeholder="Cuisine type"
                  mb={2}
                />
                {errors.recipe?.cuisineType && (
                  <Text color="red">{errors.recipe.cuisineType.message}</Text>
                )}
                <Input
                  {...register("recipe.mealType")}
                  placeholder="Meal type"
                  mb={2}
                />
                {errors.recipe?.mealType && (
                  <Text color="red">{errors.recipe.mealType.message}</Text>
                )}
                <Input
                  {...register("recipe.dishType")}
                  placeholder="Dish type"
                  mb={2}
                />
                {errors.recipe?.dishType && (
                  <Text color="red">{errors.recipe.dishType.message}</Text>
                )}
                <Input
                  {...register("recipe.calories", { valueAsNumber: true })}
                  type="number"
                  placeholder="Calories"
                  mb={2}
                />{" "}
                {errors.recipe?.calories && (
                  <Text color="red">{errors.recipe.calories.message}</Text>
                )}
              </FormControl>

              <FormControl padding={2}>
                <FormLabel>INGREDIENTS</FormLabel>
                <Box mb={4}>
                  <Box display="flex" justifyContent="end" alignItems="center">
                    <Button
                      onClick={addIngredient}
                      rounded="full"
                      colorScheme="green"
                      size="xs" // Set the size to small for a smaller button
                    >
                      Add Ingredient
                    </Button>
                  </Box>
                </Box>
                <Controller
                  name="recipe.ingredients"
                  control={control}
                  render={({ field }) => (
                    <>
                      {field.value.map((ingredient, index) => (
                        <Box key={index} mb={6}>
                          <label>Ingredient {index + 1}</label>
                          <Box mt={2}>
                            <Input
                              {...register(
                                `recipe.ingredients.${index}.text` as const
                              )}
                              defaultValue={ingredient.text}
                              placeholder="Ingredient"
                              mb={2}
                            />
                            {errors.recipe?.ingredients?.[index]?.text && ( // Access the specific error for this ingredient
                              <Text color="red">
                                {
                                  errors.recipe.ingredients[index]?.text
                                    ?.message
                                }
                              </Text>
                            )}
                            <Input
                              {...register(
                                `recipe.ingredients.${index}.quantity` as const,
                                {
                                  valueAsNumber: true,
                                }
                              )}
                              type="number"
                              placeholder="Quantity"
                              mb={2}
                            />{" "}
                            {errors.recipe?.ingredients?.[index]?.quantity && ( // Access the specific error for this ingredient
                              <Text color="red">
                                {
                                  errors.recipe.ingredients[index]?.quantity
                                    ?.message
                                }
                              </Text>
                            )}
                            <Input
                              {...register(
                                `recipe.ingredients.${index}.measure` as const
                              )}
                              defaultValue={ingredient.measure}
                              placeholder="Measure"
                              mb={2}
                            />{" "}
                            {errors.recipe?.ingredients?.[index]?.measure && ( // Access the specific error for this ingredient
                              <Text color="red">
                                {
                                  errors.recipe.ingredients[index]?.measure
                                    ?.message
                                }
                              </Text>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </>
                  )}
                />
              </FormControl>
              <Flex justifyContent="center">
                {" "}
                {/* Use Flex to center the Upload button */}
                <Button
                  disabled={!isValid}
                  type="submit"
                  rounded="full"
                  colorScheme="blue"
                  mr={3}
                >
                  <MdUpload />
                  <Text paddingLeft={2}>Upload</Text>
                </Button>
              </Flex>
              <ScrollToTopButton />
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>{" "}
      <Modal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congrats!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="green">Recipe successfully uploaded!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSuccessModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRecipeModal;
