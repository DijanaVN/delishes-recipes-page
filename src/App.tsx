import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipeCard from "./components/RecipeCard";
import RecipesList from "./components/RecipeList";
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
                templateAreas={
                  window.innerWidth >= 1000
                    ? `'nav nav' 'aside main ' 'footer footer'`
                    : `' nav' 'main' 'aside'`
                }
                templateColumns={
                  window.innerWidth >= 1000 ? " 30% 70%" : "%" // Single column for screens less than 1000px
                }
                minHeight="100vh"
              >
                {/* templateAreas={`'nav nav' 'aside main ' 'footer footer'`}
                templateColumns={"30% 70%"}
                minHeight={"100vh"} */}

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
                <GridItem minHeight="100vh" area={"aside"}>
                  <RecipesList />
                </GridItem>
                <GridItem area={"main"}>
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
