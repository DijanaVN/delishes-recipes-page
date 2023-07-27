import { useContext, useState } from "react";
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { useBookmarkedRecipes } from "../state-management/bookmarkedRecipesContext";
import useRecipes from "../hooks/useRecipes";
import searchTextContext from "../state-management/searchTextContext";

const BookmarkedList = () => {
  const { bookmarkedRecipes, addBookmark, removeBookmark } =
    useBookmarkedRecipes();
  const { searchText } = useContext(searchTextContext);
  const { combinedRecipes } = useRecipes(searchText);
  const [showNoBookmarkMessage, setShowNoBookmarkMessage] = useState(false);

  // const handle = () => {
  //   bookmarkedRecipes.length === 0 && console.log("No bookmarked recipes yet.");
  // };

  const handle = () => {
    setShowNoBookmarkMessage(bookmarkedRecipes.length === 0);
  };

  return (
    <Flex>
      <Menu>
        <MenuButton
          rounded="full"
          as={Button}
          onClick={handle}
          rightIcon={<BsChevronDown />}
          leftIcon={<FaRegBookmark />}
          variant="solid"
          paddingX={2}
          marginRight={2} // Adjust the margin as needed
        >
          Bookmarks
        </MenuButton>
        <MenuList padding={1}>
          {bookmarkedRecipes.length > 0 ? (
            bookmarkedRecipes.map((recipe) => (
              <MenuItem key={recipe.recipe.uri}>{recipe.recipe.label}</MenuItem>
            ))
          ) : (
            <MenuItem>
              {showNoBookmarkMessage ? "No bookmarked recipes yet." : ""}
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default BookmarkedList;
