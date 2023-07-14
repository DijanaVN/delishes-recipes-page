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
import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  bookmarkedRecipes: Recipe[];
}

const BookmarkedList = ({ bookmarkedRecipes }: Props) => {
  console.log(bookmarkedRecipes);

  return (
    <Box>
      <Heading size="md">Bookmarked Recipes</Heading>
      {bookmarkedRecipes.length === 0 ? (
        <Text>No bookmarked recipes yet.</Text>
      ) : (
        <ul>
          {bookmarkedRecipes.map((recipe) => (
            <li key={recipe.recipe.uri}>{recipe.recipe.label}</li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default BookmarkedList;
