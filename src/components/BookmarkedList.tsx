import { Box, Button, Flex, Text, Image, useColorMode } from "@chakra-ui/react";
import useRecipes, { Recipe } from "../hooks/useRecipes";
import { useEffect, useState } from "react";

interface Props {
  bookmarkedRecipes: Recipe[];
}

const BookmarkedList = ({ bookmarkedRecipes }: Props) => {
  return (
    <Box>
      <ul>
        {bookmarkedRecipes.length > 0
          ? bookmarkedRecipes?.map((recipe) => (
              <li key={recipe.recipe.uri}>
                <Text>{recipe.recipe.label}</Text>
              </li>
            ))
          : " "}
      </ul>
    </Box>
  );
};

export default BookmarkedList;
