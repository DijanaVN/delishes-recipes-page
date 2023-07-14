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
import { MdAdd, MdUpload } from "react-icons/md";
import { Recipe } from "../hooks/useRecipes";
import ownrecipe from "../../images-logos/yourownrecipeslg.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ingrediantObjectFunction } from "./ingrediantFunction";

const ingredientSchema = z.array(z.string());

const recipeSchema = z.object({
  recipe: z.object({
    label: z
      .string()
      .min(3, { message: "Title needs to be at least 3 characters." }),
    ingredients: ingredientSchema,
  }),

  images: z.string().optional(),
  calories: z.number({ invalid_type_error: "Calories field is required." }),
  mealType: z
    .string()
    .min(3, { message: "Meal Type needs to be at least 3 characters." }),
  dishType: z
    .string()
    .min(3, { message: "Dish Type needs to be at least 3 characters." }),
});

interface Props {
  onRecipeUpload: (recipeData: Recipe) => void;
}

// interface FormData {
//   recipe: {
//     label: string;
//     ingredients: string[];
//   };
//   images: string;
//   calories: number;
//   mealType: string;
//   dishType: string;
// }

type FormData = z.infer<typeof recipeSchema>;

const AddRecipeModal = ({ onRecipeUpload }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      images: ownrecipe,
    },
  });

  console.log(errors);

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
    console.log(ingrediantObjectFunction(data));
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl padding={2}>
                <FormLabel>RECIPE DATA</FormLabel>
                <Input
                  {...register("recipe.label")}
                  placeholder="Title"
                  mb={2}
                />
                {errors.recipe?.label && (
                  <Text color="red">{errors.recipe.label.message}</Text>
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
      </Modal>
    </>
  );
};

export default AddRecipeModal;
