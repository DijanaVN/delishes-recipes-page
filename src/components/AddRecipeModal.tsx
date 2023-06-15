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
  Flex,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Text } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import { MdAdd, MdUpload } from "react-icons/md";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  onRecipeUpload: (recipeData: Recipe) => void;
}

const AddRecipeModal = ({ onRecipeUpload }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const mealRef = useRef<HTMLInputElement | null>(null);
  const dishRef = useRef<HTMLInputElement | null>(null);
  const caloriesRef = useRef<HTMLInputElement | null>(null);
  const ingredientRefs = useRef<HTMLInputElement[]>([]);

  const [ingredientInputs, setIngredientInputs] = useState<string[]>([]);

  const handleAddIngredient = () => {
    setIngredientInputs((prevInputs) => [...prevInputs, ""]);
  };
  const handleIngredientAdd = (index: number, value: string) => {
    setIngredientInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = value;
      return updatedInputs;
    });
  };
  const handleUpload = () => {
    console.log(ingredientInputs);
    const recipeData: Recipe = {
      recipe: {
        uri: "",
        label: titleRef.current?.value || "",
        image: "",
        source: "",
        url: "",
        ingredients: ingredientRefs.current.map((input) => {
          const [text, quantity] = input.value.split(",");
          return {
            text: text.trim(),
            quantity: parseFloat(quantity.trim()) || 0,
            measure: "",
            food: "",
            weight: 0,
            foodId: "",
          };
        }),
        images: {
          LARGE: {
            url: "",
            width: 0,
            height: 0,
          },
        },
        calories: 0,
        cuisineType: [],
        mealType: [],
        dishType: [],
        instructions: [],
        tags: [],
        totalWeight: 0,
        totalNutrients: {
          label: "",
          quantity: 0,
          unit: "",
        },
        searchText: "",
      },
    };

    onRecipeUpload(recipeData);

    onClose();
  };

  return (
    <>
      <Button rounded="full" onClick={onOpen}>
        <BsPencilSquare fontSize="120%" />
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                console.log("submited");
              }}
            >
              <FormControl padding={2}>
                <FormLabel>RECIPE DATA</FormLabel>

                <Input ref={titleRef} placeholder="Title" mb={2} />
                <Input ref={mealRef} placeholder="Meal type" mb={2} />
                <Input ref={dishRef} placeholder="Dish type" mb={2} />
                <Input ref={caloriesRef} placeholder="Calories" mb={2} />
              </FormControl>

              <FormControl padding={2}>
                <FormLabel>INGREDIENTS</FormLabel>
                {ingredientInputs.map((ingredient, index) => (
                  <Input
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        ingredientRefs.current[index] = ref;
                      }
                    }}
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientAdd(index, e.target.value)}
                    mb={2}
                  />
                ))}
                <Button
                  leftIcon={<MdAdd />}
                  variant="outline"
                  size="sm"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </Button>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              onClick={handleUpload}
              rounded={"full"}
              colorScheme="blue"
              mr={3}
            >
              <MdUpload />
              <Text paddingLeft={2}>Upload</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRecipeModal;
