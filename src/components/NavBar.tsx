import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import AddRecipeModal from "./AddRecipeModalForm";
import BookmarkedList from "./BookmarkedList";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      p={2}
    >
      <HStack spacing={2} alignItems="center">
        <Link to={"/"}>
          <HStack>
            <VStack mr={0} spacing={0}>
              <Image
                boxSize={{ base: "8", md: "10" }}
                borderRadius={5}
                maxH="100%"
                maxW="100%"
                src={logo}
                alt="Recipes image-logo"
              />
              <Text fontSize={12}>Home</Text>
            </VStack>
            <Box
              as="h1"
              fontSize={{ base: "md", sm: "2xl" }}
              fontWeight="bold"
              fontFamily="Parisienne-Regular"
              paddingRight={2}
            >
              Delicious
            </Box>
          </HStack>
        </Link>
      </HStack>
      <Box flex={{ base: 1, md: "2" }}>
        <SearchInput />
      </Box>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        paddingLeft={2}
        fontSize={{ base: "md", sm: "2xl" }}
      >
        <BookmarkedList />
        <AddRecipeModal />
        <ColorModeSwitch />
      </Flex>
    </Flex>
  );
};
export default NavBar;
