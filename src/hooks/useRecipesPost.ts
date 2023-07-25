import { Updater, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import apiClientPost from "../services/api-client-post";
import { Recipe } from "./useRecipes";

export interface RecipePost {
  title: string;
  ingr: string[];
  prep: string[];
  img: string;
  tags: string[];
}
interface AddRecipesContext {
  previousRecipes: RecipePost[];
}

const useRecipesPost = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const addRecipeMutation = useMutation<
    Recipe,
    Error,
    RecipePost,
    AddRecipesContext
  >({
    mutationFn: (newRecipe: RecipePost) =>
      apiClientPost
        .post<RecipePost>("/api/recipe-book/v1/{app-id}/draft", newRecipe)
        .then((res) => res.data),

    onMutate: (newRecipe: RecipePost) => {
      const previousRecipes =
        queryClient.getQueriesData<RecipePost[]>(["draft"]) || [];

      queryClient.setQueriesData<RecipePost[]>(["draft"], (recipe) => [
        newRecipe,
        ...(recipe || []),
      ]);
      onAdd();
      return { previousRecipes };
    },

    onSuccess: (savedNewRecipe: RecipePost, newRecipe: RecipePost) => {
      queryClient.invalidateQueries({
        queryKey: ["draft"],
      });
      queryClient.setQueriesData<RecipePost[]>(["draft"], (recipe) =>
        recipe?.map((res) => (res === newRecipe ? savedNewRecipe : res))
      );
    },

    onError: (
      error: any,
      newRecipe: any,
      context: {
        previousRecipes: Updater<
          RecipePost[] | undefined,
          RecipePost[] | undefined
        >;
      }
    ) => {
      if (!context) return;
      queryClient.setQueriesData<RecipePost[]>(
        ["draft"],
        context.previousRecipes
      );
    },
  });

  const addRecipe = (newRecipe: RecipePost) => {
    addRecipeMutation.mutate(newRecipe);
  };

  return {
    addRecipe,
    addRecipeError: addRecipeMutation.error,
    addRecipeIsLoading: addRecipeMutation.isLoading,
  };
};

export default useRecipesPost;
