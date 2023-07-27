import { useContext } from "react";
import { Text } from "@chakra-ui/react";
import selectedRecipeContext from "../state-management/selectedRecipeContext";
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { useBookmarkedRecipes } from "../state-management/bookmarkedRecipesContext";
import useRecipes from "../hooks/useRecipes";
import searchTextContext from "../state-management/searchTextContext";

const BookmarkedList = () => {
  const { selectedRecipe } = useContext(selectedRecipeContext);
  const { bookmarkedRecipes, addBookmark, removeBookmark } =
    useBookmarkedRecipes();
  const { searchText } = useContext(searchTextContext);
  const { combinedRecipes } = useRecipes(searchText);

  console.log(bookmarkedRecipes);
  console.log(combinedRecipes);
  console.log(selectedRecipe);

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

        {bookmarkedRecipes.length === 0 ? (
          <Text>No bookmarked recipes yet.</Text>
        ) : (
          <MenuList padding={1}>
            {bookmarkedRecipes.map((recipe) => (
              <MenuItem key={recipe.recipe.uri}>{recipe.recipe.label}</MenuItem>
            ))}
          </MenuList>
        )}
      </Menu>
    </Flex>
  );
};

export default BookmarkedList;
