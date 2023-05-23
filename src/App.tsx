import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid templateAreas={`'nav nav' 'aside main '`}>
      <GridItem area={"nav"}>Nav</GridItem>

      <GridItem area={"aside"}>aside</GridItem>
      <Grid gridArea={"main"}>
        <GridItem>main</GridItem>
        <GridItem>footer</GridItem>
      </Grid>
    </Grid>
  );
}

export default App;
