import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "../../images-logos/logozoomed.webp";

const NavBar = () => {
  return (
    <>
      <Flex align="center" boxSize="10">
        <Image maxH="100%" maxW="100%" src={logo} alt="Recipes image-logo" />
        <Box
          ml="3"
          fontSize="3xl"
          fontWeight={"bold"}
          fontFamily="Parisienne-Regular"
          color={"black"}
        >
          Delicious
        </Box>
      </Flex>
    </>
  );
};

export default NavBar;
