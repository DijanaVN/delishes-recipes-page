import "./App.css";
import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipeGrid from "./components/RecipeGrid";

function App() {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Grid templateAreas={`'nav nav' 'aside main ' 'footer footer'`}>
      <GridItem padding={1} area={"nav"} bg="bluecolor">
        <NavBar />
      </GridItem>

      <GridItem minHeight="80vh" area={"aside"} paddingLeft={8} paddingTop={5}>
        <RecipeGrid />
      </GridItem>

      <GridItem area={"main"}>main</GridItem>

      <GridItem minHeight="20vh" bg="bluecolor" area={"footer"}>
        footer
      </GridItem>
    </Grid>
  );
}

export default App;
