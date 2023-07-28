import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipeCard from "./components/RecipeCard";
import RecipesList from "./components/RecipeList";
import { useState } from "react";
import { Recipe } from "./hooks/useRecipes";
import { NewRecipesProvider } from "./state-management/newRecipeContext";
import { SelectedRecipeProvider } from "./state-management/selectedRecipeContext";
import { BookmarkedRecipesProvider } from "./state-management/bookmarkedRecipesContext";
import { SearchTextProvider } from "./state-management/searchTextContext";

function App() {
  return (
    <>
      <BookmarkedRecipesProvider>
        <SelectedRecipeProvider>
          <SearchTextProvider>
            <NewRecipesProvider>
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
            </NewRecipesProvider>
          </SearchTextProvider>
        </SelectedRecipeProvider>
      </BookmarkedRecipesProvider>
    </>
  );
}

export default App;
