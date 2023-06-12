import React from "react";
import { Box, Flex, HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
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
            paddingLeft={5}
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
        <Box width={"70%"}>
          <SearchInput />
        </Box>
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
