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
  VStack,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import ownrecipe from "../../images-logos/yourownrecipeslg.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useNewRecipes } from "../state-management/newRecipeContext";
import { Recipe } from "../hooks/useRecipes";

const ingredientSchema = z.array(z.string());

const recipeSchema = z.object({
  recipe: z.object({
    uri: z.string(),
    label: z
      .string()
      .min(3, { message: "Title needs to be at least 3 characters." }),
    ingredients: ingredientSchema,
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
  const { setNewRecipes } = useNewRecipes();

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

  const ingrediantObjectFunction = (data: FieldValues): Recipe => {
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