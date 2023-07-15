import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipeCard from "./components/RecipeCard";
import RecipesList from "./components/RecipeList";
import { useState } from "react";
import { Recipe } from "./hooks/useRecipes";
import useBookmarkedRecipes from "./hooks/useBookmarkedRecipes";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState("");
  const [newRecipe, setNewRecipe] = useState<Recipe | null>(null);
  const [b, setb] = useState<Recipe[]>([]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleAddNewRecipe = (newRecipe: Recipe) => {
    setNewRecipe(newRecipe);
  };
  const handleB = () => {
    setb(isBookmarkedValue);
  };
  const { isBookmarkedValue } = useBookmarkedRecipes({
    selectedRecipe,
    onB: handleB,
  });

  console.log(newRecipe);

  // console.log(b);

  return (
    <Grid
      templateAreas={`'nav nav' 'aside main ' 'footer footer'`}
      templateColumns={"30% 70%"}
      minHeight={"100vh"}
    >
      <GridItem padding={1} area={"nav"} bg="bluecolor">
        <NavBar
          onSearch={handleSearch}
          onRecipeUpload={handleAddNewRecipe}
          selectedRecipe={selectedRecipe}
          bookmarkedRecipes={b}
        />
      </GridItem>
      <GridItem minHeight="80vh" area={"aside"}>
        <RecipesList
          onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
          searchText={searchText}
          newRecipe={newRecipe}
        />
      </GridItem>
      <GridItem area={"main"} gridColumn="2 / 3">
        <RecipeCard selectedRecipe={selectedRecipe} newRecipe={newRecipe} />
      </GridItem>
    </Grid>
  );
}

export default App;
