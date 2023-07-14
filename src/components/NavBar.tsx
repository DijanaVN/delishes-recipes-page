import { Box, HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import AddRecipeModal from "./AddRecipeModal";
import AddBookmark from "./Addbookmark";
import { Recipe } from "../hooks/useRecipes";
import { Props } from "../hooks/useBookmarkedRecipes";

interface NavBarProps extends Props {
  onSearch: (searchText: string) => void;
  onRecipeUpload: (recipeData: Recipe) => void;
  bookmarkedRecipes: Recipe[];
  // onB: (bookmarkedRecipe: Recipe[]) => void;
}

const NavBar = ({
  onSearch,
  onRecipeUpload,
  selectedRecipe,
  bookmarkedRecipes,
}: NavBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <HStack justifyContent="space-between">
        <HStack justifyItems="center" paddingRight={2}>
          <Image
            boxSize={10}
            borderRadius={5}
            maxH="100%"
            maxW="100%"
            src={logo}
            alt="Recipes image-logo"
          />
          <Box
            paddingLeft={3}
            paddingTop={2}
            fontSize="3xl"
            fontWeight="bold"
            fontFamily="Parisienne-Regular"
            color={colorMode === "dark" ? "white" : "black"}
            onClick={toggleColorMode}
          >
            Delicious
          </Box>
        </HStack>
        <Box paddingLeft={5} width="70%">
          <SearchInput onSearch={onSearch} />
        </Box>
        <AddRecipeModal onRecipeUpload={onRecipeUpload} />
        <AddBookmark bookmarkedRecipes={bookmarkedRecipes} />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
