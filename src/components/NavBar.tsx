import { Box, Flex, HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import AddRecipeModal from "./AddRecipeModalForm";
import BookmarkedList from "./BookmarkedList";

const NavBar = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      p={2}
    >
      <HStack spacing={2} alignItems="center">
        <Image
          boxSize={{ base: "8", md: "10" }}
          borderRadius={5}
          maxH="100%"
          maxW="100%"
          src={logo}
          alt="Recipes image-logo"
        />
        <Box
          as="h1"
          fontSize={{ base: "md", sm: "2xl" }}
          fontWeight="bold"
          fontFamily="Parisienne-Regular"
          onClick={toggleColorMode}
          paddingRight={2}
        >
          Delicious
        </Box>
      </HStack>
      <Box flex={{ base: 1, md: "2" }}>
        <SearchInput />
      </Box>
      <Flex justifyContent="flex-end" alignItems="center">
        <ColorModeSwitch />
        <BookmarkedList />
        <AddRecipeModal />
      </Flex>
    </Flex>
  );
};
export default NavBar;
