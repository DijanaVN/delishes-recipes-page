import { Grid, GridItem } from "@chakra-ui/react";
import RecipeCard from "../components/RecipeCard";
import RecipesList from "../components/RecipeList";
import { BookmarkedRecipesProvider } from "../state-management/bookmarkedRecipesContext";
import { NewRecipesProvider } from "../state-management/newRecipeContext";
import { SearchTextProvider } from "../state-management/searchTextContext";
import { SelectedRecipeProvider } from "../state-management/selectedRecipeContext";
import { useLocation } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";

const HomePage = () => {
  const location = useLocation();
  const searchText = new URLSearchParams(location.search).get("q") || "";
  useRecipes(searchText);
  return (
    <>
      <Grid
        templateAreas={
          window.innerWidth >= 1000
            ? ` 'aside main ' 'footer footer'`
            : ` 'main' 'aside'`
        }
        templateColumns={window.innerWidth >= 1000 ? " 30% 70%" : "100%"}
        minHeight="100vh"
      >
        <GridItem minHeight="100vh" area={"aside"}>
          <RecipesList />
        </GridItem>
        <GridItem area={"main"}>
          <RecipeCard />
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
