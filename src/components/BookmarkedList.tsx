import { useContext, useState } from "react";
import {
  Center,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { useBookmarkedRecipes } from "../state-management/bookmarkedRecipesContext";
import { useSelectedRecipe } from "./../state-management/selectedRecipeContext";

const BookmarkedList = () => {
  const { bookmarkedRecipes } = useBookmarkedRecipes();
  const [showNoBookmarkMessage, setShowNoBookmarkMessage] = useState(false);
  const { setSelectedRecipe } = useSelectedRecipe();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookmarkedRecipes.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = currentPage * 5;

  const handle = () => {
    setShowNoBookmarkMessage(bookmarkedRecipes.length === 0);
  };

  const displayRecipe = (uri: string) => {
    const selected = bookmarkedRecipes.find(
      (recipe) => recipe.recipe.uri === uri
    );

    if (selected) {
      setSelectedRecipe(selected);
    }
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
          marginRight={2}
        >
          Bookmarks
        </MenuButton>
        <MenuList padding={1}>
          <VStack spacing={1}>
            {bookmarkedRecipes.length > 0 ? (
              bookmarkedRecipes.slice(startIndex, endIndex).map((recipe) => (
                <Button
                  width="100%"
                  paddingX={1}
                  key={recipe.recipe.uri}
                  variant="solid"
                  onClick={() => displayRecipe(recipe.recipe.uri)}
                >
                  {recipe.recipe.label}
                </Button>
              ))
            ) : (
              <MenuItem>
                {showNoBookmarkMessage ? "No bookmarked recipes yet." : ""}
              </MenuItem>
            )}
          </VStack>{" "}
          {totalPages > 1 && (
            <Center mt={1}>
              <HStack mt={1}>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    size={"sm"}
                    key={index}
                    variant={index + 1 === currentPage ? "solid" : "ghost"}
                    colorScheme="blue"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </HStack>
            </Center>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default BookmarkedList;
