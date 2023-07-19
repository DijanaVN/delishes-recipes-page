// import React, { useEffect, useState } from "react";
// import { Box, Text, Heading } from "@chakra-ui/react";
// import { Recipe } from "../hooks/useRecipes";
// import useBookmarkedRecipes from "../hooks/useBookmarkedRecipes";

// interface Props {
//   selectedRecipe: Recipe | null;
//   onB: (bookmarkedRecipes: Recipe[]) => void;
// }

// const BookmarkedList = ({ selectedRecipe, onB }: Props) => {
//   const [updatedBookmarked, setUpdatedBookmarked] = useState<Recipe[]>([]);

//   useEffect(() => {
//     if (selectedRecipe) {
//       setUpdatedBookmarked((prevRecipes) => [...prevRecipes, selectedRecipe]);
//       onB(updatedBookmarked); // Call onB with the updated bookmarked recipes
//     }
//   }, [selectedRecipe]);

//   console.log(updatedBookmarked);
//   console.log(selectedRecipe);

//   return (
//     <Box>
//       <Heading size="md">Bookmarked Recipes</Heading>
//       {updatedBookmarked.length === 0 ? (
//         <Text>No bookmarked recipes yet.</Text>
//       ) : (
//         <ul>
//           {updatedBookmarked.map((recipe) => (
//             <li key={recipe.recipe.uri}>{recipe.recipe.label}</li>
//           ))}
//         </ul>
//       )}
//     </Box>
//   );
// };

// export default BookmarkedList;

// import { Box, Text, Heading } from "@chakra-ui/react";
// import useBookmarkedRecipes from "../hooks/useBookmarkedRecipes";
// import { Props } from "../hooks/useBookmarkedRecipes";

// const BookmarkedList = ({ selectedRecipe }: Props) => {
//   const { isBookmarkedValue } = useBookmarkedRecipes({ selectedRecipe });
//   console.log(selectedRecipe);
//   console.log(isBookmarkedValue);

//   return (
//     <Box>
//       <Heading size="md">Bookmarked Recipes</Heading>
//       {isBookmarkedValue.length === 0 ? (
//         <Text>No bookmarked recipes yet.</Text>
//       ) : (
//         <ul>
//           {isBookmarkedValue.map((recipe) => (
//             <li key={recipe.recipe.uri}>{recipe.recipe.label}</li>
//           ))}
//         </ul>
//       )}
//     </Box>
//   );
// };

// export default BookmarkedList;

import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";

const BookmarkedRecipes = () => {
  return (
    <Flex>
      <Menu>
        <MenuButton
          rounded="full"
          as={Button}
          rightIcon={<BsChevronDown />}
          leftIcon={<FaRegBookmark />}
          variant="solid"
          paddingX={2}
          marginRight={2} // Adjust the margin as needed
        >
          Bookmarks
        </MenuButton>
        <MenuList>
          <MenuItem>recipe 1</MenuItem>
          <MenuItem>recipe 2</MenuItem>
          <MenuItem>recipe 3</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default BookmarkedRecipes;
