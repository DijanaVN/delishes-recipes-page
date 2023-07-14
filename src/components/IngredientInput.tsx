import React from "react";
import { VStack, Input, Text, FormControl, FormLabel } from "@chakra-ui/react";

interface Props {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  error: string | undefined;
}

const IngredientInput = ({ index, value, onChange, error }: Props) => {
  return (
    <FormControl key={index} padding={2}>
      <FormLabel>Ingredient {index + 1}</FormLabel>
      <VStack>
        <Input
          id={`ing-${index}`}
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder="Ingredient"
        />
        {error && <Text color="red">{error}</Text>}
      </VStack>
    </FormControl>
  );
};

export default IngredientInput;
