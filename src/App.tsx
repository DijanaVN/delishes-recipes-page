import "./App.css";
import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Grid templateAreas={`'nav nav' 'aside main ' 'footer footer'`}>
      <GridItem padding={1} area={"nav"} bg="bluecolor">
        <NavBar />
      </GridItem>

      <GridItem minHeight="80vh" area={"aside"} bg={"secondary"}>
        aside
      </GridItem>

      <GridItem
        bgGradient="linear(to-b,rgba(213,231,184,1), rgba(34,146,195,1) )"
        area={"main"}
      >
        main
      </GridItem>

      <GridItem minHeight="20vh" bg="bluecolor" area={"footer"}>
        footer
      </GridItem>
    </Grid>
  );
}

export default App;
