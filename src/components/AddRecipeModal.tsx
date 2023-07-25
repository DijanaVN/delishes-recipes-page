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
  HStack,
  VStack,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import { Recipe } from "../hooks/useRecipes";
import ownrecipe from "../../images-logos/yourownrecipeslg.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import newRecipeContext from "../state-management/newRecipeContext";

const ingredientSchema = z.array(z.string());

const recipeSchema = z.object({
  recipe: z.object({
    uri: z.string(),
    label: z
      .string()
      .min(3, { message: "Title needs to be at least 3 characters." }),
    ingredients: ingredientSchema,
    image: z.string(),
  }),

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
});

type FormData = z.infer<typeof recipeSchema>;

const AddRecipeModal = () => {
  const { newRecipe, setNewRecipe } = useContext(newRecipeContext);

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
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      recipe: {
        uri: generateRandomUniqueUri(),
        image: ownrecipe,
      },
    },
  });

  console.log(errors);
  const ingrediantObjectFunction = (data: FieldValues) => {
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

  const ingredientsValue = watch("recipe.ingredients");

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    // Split the input value into an array of strings
    const ingredientsArray = value
      .split(",")
      .map((ingredient) => ingredient.trim());

    // Update the field value with the array
    setValue("recipe.ingredients", ingredientsArray);
  };

  const onSubmit = (data: FieldValues) => {
    setNewRecipe(ingrediantObjectFunction(data));

    setIsUploaded(true);
    openSuccessModal();
    onClose();
    reset();
  };

  const handleSuccessModalClose = () => {
    setIsUploaded(false);
    closeSuccessModal();
  };

  return (
    <>
      <Button rounded="full" onClick={onOpen}>
        <BsPencilSquare fontSize="200%" />
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
                  {...register("cuisineType")}
                  placeholder="Cuisine type"
                  mb={2}
                />
                {errors.cuisineType && (
                  <Text color="red">{errors.cuisineType.message}</Text>
                )}
                <Input
                  {...register("mealType")}
                  placeholder="Meal type"
                  mb={2}
                />
                {errors.mealType && (
                  <Text color="red">{errors.mealType.message}</Text>
                )}
                <Input
                  {...register("dishType")}
                  placeholder="Dish type"
                  mb={2}
                />
                {errors.dishType && (
                  <Text color="red">{errors.dishType.message}</Text>
                )}
                <Input
                  {...register("calories", { valueAsNumber: true })}
                  type="number"
                  placeholder="Calories"
                  mb={2}
                />{" "}
                {errors.calories && (
                  <Text color="red">{errors.calories.message}</Text>
                )}
              </FormControl>

              <FormControl padding={2}>
                <FormLabel>INGREDIENTS</FormLabel>
                <VStack>
                  <label htmlFor="ing">Ingredient 1</label>
                  <Input
                    id="ing"
                    value={ingredientsValue?.join(", ") || ""}
                    onChange={handleIngredientInputChange}
                    placeholder="Format ingediant, quantity, measure"
                  />
                  {errors.recipe?.ingredients && (
                    <Text color="red">
                      {errors.recipe?.ingredients?.message}
                    </Text>
                  )}
                </VStack>
              </FormControl>
              <Button
                disabled={!isValid}
                type="submit"
                rounded={"full"}
                colorScheme="blue"
                mr={3}
              >
                <MdUpload />
                <Text paddingLeft={2}>Upload</Text>
              </Button>
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
