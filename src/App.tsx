import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

import RecipeCard from "./components/RecipeCard";
import RecipesList from "./components/RecipeList";
import { useState } from "react";
import { Recipe } from "./hooks/useRecipes";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };
  console.log(searchText);

  return (
    <Grid
      templateAreas={`'nav nav' 'aside main ' 'footer footer'`}
      templateColumns={"30% 70%"}
      minHeight={"100vh"}
    >
      <GridItem padding={1} area={"nav"} bg="bluecolor">
        <NavBar onSearch={handleSearch} />
      </GridItem>
      <GridItem minHeight="80vh" area={"aside"}>
        <RecipesList
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          searchText={searchText}
        />
      </GridItem>
      <GridItem area={"main"} gridColumn="2 / 3">
        <RecipeCard selectedRecipe={selectedRecipe} />
      </GridItem>
    </Grid>
  );
}

export default App;
