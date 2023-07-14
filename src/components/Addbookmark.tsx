// import { Button, Text } from "@chakra-ui/react";
// import { FaRegBookmark } from "react-icons/fa";
// import BookmarkedList from "./BookmarkedList";
// import { useState } from "react";
// import useBookmarkedRecipes, { Props } from "../hooks/useBookmarkedRecipes";
// import { Recipe } from "../hooks/useRecipes";

// interface Propss extends Props {
//   onB: (bookmarkedRecipes: Recipe[]) => void;
// }

// const AddBookmark = ({ selectedRecipe, onB }: Propss) => {
//   const { isBookmarked } = useBookmarkedRecipes({
//     selectedRecipe,
//     onB,
//   });

//   const [showBookmarkedRecipes, setShowBookmarkedRecipes] = useState(false);

//   const handleBookmarkClick = () => {
//     setShowBookmarkedRecipes(!showBookmarkedRecipes);
//   };

//   return (
//     <>
//       <Button onClick={handleBookmarkClick} rounded="full">
//         <FaRegBookmark fontSize="180%" />
//         <Text paddingLeft={2}>Bookmarks</Text>
//       </Button>

//       {showBookmarkedRecipes && (
//         <BookmarkedList
//           bookmarkedRecipes={isBookmarked ? [selectedRecipe] : []}
//           onB={onB}
//         />
//       )}
//     </>
//   );
// };

// export default AddBookmark;
import { Button, Text } from "@chakra-ui/react";
import { FaRegBookmark } from "react-icons/fa";
import BookmarkedList from "./BookmarkedList";
import { useState } from "react";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  bookmarkedRecipes: Recipe[];
}

const AddBookmark = ({ bookmarkedRecipes }: Props) => {
  const [showBookmarkedRecipes, setShowBookmarkedRecipes] = useState(false);

  const handleBookmarkClick = () => {
    setShowBookmarkedRecipes(!showBookmarkedRecipes);
  };

  return (
    <>
      <Button onClick={handleBookmarkClick} rounded="full">
        <FaRegBookmark fontSize="180%" />
        <Text paddingLeft={2}>Bookmarks</Text>
      </Button>

      {showBookmarkedRecipes && (
        <BookmarkedList bookmarkedRecipes={bookmarkedRecipes} />
      )}
    </>
  );
};

export default AddBookmark;
