import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid templateAreas={`'nav nav' 'aside main '`}>
      <GridItem
        padding={1.5}
        area={"nav"}
        bgGradient="linear(to-t,rgba(213,231,184,1), rgba(34,146,195,1) )"
      >
        <NavBar />
      </GridItem>

      <GridItem
        minHeight="100vh"
        area={"aside"}
        bgGradient="linear(to-b,rgba(213,231,184,1), rgba(34,146,195,1) )"
      >
        aside
      </GridItem>
      <Grid
        bgGradient="linear(to-b,rgba(213,231,184,1) , rgba(34,146,195,1) )"
        gridArea={"main"}
      >
        <GridItem>main</GridItem>
        <GridItem>footer</GridItem>
      </Grid>
    </Grid>
  );
}

export default App;
