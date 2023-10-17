import { Outlet } from "react-router-dom";
import NavBar from "./../components/NavBar";
import { GridItem } from "@chakra-ui/react";
import React from "react";

const Layout = () => {
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
      <Outlet />
    </>
  );
};

export default Layout;
