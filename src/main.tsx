import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./pages/routes";
import { BookmarkedRecipesProvider } from "./state-management/bookmarkedRecipesContext";
import { NewRecipesProvider } from "./state-management/newRecipeContext";
import { SearchTextProvider } from "./state-management/searchTextContext";
import { SelectedRecipeProvider } from "./state-management/selectedRecipeContext";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 100 },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BookmarkedRecipesProvider>
          <SelectedRecipeProvider>
            <SearchTextProvider>
              <NewRecipesProvider>
                <RouterProvider router={router} />
                {/* <App /> */}
                <ReactQueryDevtools />{" "}
              </NewRecipesProvider>
            </SearchTextProvider>
          </SelectedRecipeProvider>
        </BookmarkedRecipesProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
