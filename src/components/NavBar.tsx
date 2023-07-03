import React from "react";
import { Box, Flex, HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import AddRecipeModal from "./AddRecipeModal";
import { Recipe } from "../hooks/useRecipes";
import AddBookmark from "./Addbookmark";

interface Props {
  onSearch: (searchText: string) => void;

  onRecipeUpload: (recipeData: Recipe) => void;

  // onBookmarkedRecipes: (bookmarkedRecipes: Recipe[]) => void;
}
const NavBar = ({ onSearch, onRecipeUpload }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <HStack justifyContent={"space-between"}>
        <HStack justifyItems="center">
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
            fontWeight={"bold"}
            fontFamily="Parisienne-Regular"
            color={colorMode === "dark" ? "white" : "black"}
            onClick={toggleColorMode}
          >
            Delicious
          </Box>
        </HStack>
        <Box paddingStart={5} width={"70%"}>
          <SearchInput onSearch={onSearch} />
        </Box>
        <AddRecipeModal onRecipeUpload={onRecipeUpload} />
        <AddBookmark />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
