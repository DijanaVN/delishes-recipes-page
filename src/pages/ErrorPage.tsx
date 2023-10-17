import { Heading, Text, Box, GridItem } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "./../components/NavBar";
import React from "react";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <GridItem
        padding={1}
        area={"nav"}
        bg="bluecolor"
        position="sticky"
        top={0}
        zIndex="sticky"
      >
        <NavBar />
      </GridItem>
      <Box padding={10}>
        <Heading>Oops</Heading>
        <Text paddingTop={5}>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : " An unexpected error occured."}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
