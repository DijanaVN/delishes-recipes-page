import "./App.css";
import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

import RecipeCard from "./components/RecipeCard";
import RecipesList from "./components/RecipeList";

function App() {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Grid
      templateAreas={`'nav nav' 'aside main ' 'footer footer'`}
      templateColumns={"30% 70%"}
      minHeight={"100vh"}
    >
      <GridItem padding={1} area={"nav"} bg="bluecolor">
        <NavBar />
      </GridItem>

      <GridItem minHeight="80vh" area={"aside"} paddingLeft={8} paddingTop={5}>
        <RecipesList />
      </GridItem>

      <GridItem area={"main"} gridColumn="2 / 3">
        <RecipeCard />
      </GridItem>

      <GridItem minHeight="20vh" bg="bluecolor" area={"footer"}>
        footer
      </GridItem>
    </Grid>
  );
}

export default App;
