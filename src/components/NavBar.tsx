import { Box, HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import AddRecipeModal from "./AddRecipeModal";
import BookmarkedRecipes from "./BookmarkedList";

const NavBar = () => {
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
          <SearchInput />
        </Box>
        <AddRecipeModal />
        <BookmarkedRecipes />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
