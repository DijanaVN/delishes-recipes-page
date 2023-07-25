import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipeCard from "./components/RecipeCard";
import RecipesList from "./components/RecipeList";
import { useState } from "react";
import { Recipe } from "./hooks/useRecipes";
import newRecipeContext from "./state-management/newRecipeContext";
import searchTextContext from "./state-management/searchTextContext";
import selectedRecipeContext from "./state-management/selectedRecipeContext";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchText, setSearchText] = useState("");
  const [newRecipe, setNewRecipe] = useState<Recipe | null>(null);
  const [b, setb] = useState<Recipe[]>([]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  console.log(newRecipe);

  return (
    <>
      <selectedRecipeContext.Provider
        value={{ selectedRecipe, setSelectedRecipe }}
      >
        <searchTextContext.Provider value={{ searchText, setSearchText }}>
          <newRecipeContext.Provider value={{ newRecipe, setNewRecipe }}>
            <Grid
              templateAreas={`'nav nav' 'aside main ' 'footer footer'`}
              templateColumns={"30% 70%"}
              minHeight={"100vh"}
            >
              <GridItem padding={1} area={"nav"} bg="bluecolor">
                <NavBar />
              </GridItem>
              <GridItem minHeight="80vh" area={"aside"}>
                <RecipesList />
              </GridItem>
              <GridItem area={"main"} gridColumn="2 / 3">
                <RecipeCard />
              </GridItem>
            </Grid>
          </newRecipeContext.Provider>
        </searchTextContext.Provider>
      </selectedRecipeContext.Provider>
    </>
  );
}

export default App;
