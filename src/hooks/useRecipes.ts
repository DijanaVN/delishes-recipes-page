import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { useNewRecipes } from "./../state-management/newRecipeContext";
interface totalNutrientsTotlaDaily {
  [key: string]: totalNutrientsTotlaDailyDetails;
}
interface totalNutrientsTotlaDailyDetails {
  label: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  recipe: {
    uri: string;
    label: string;
    image: string;
    url: string;
    source: string;
    ingredients: {
      text: string;
      quantity: number;
      measure: string;
    }[];
    images: {
      LARGE: {
        url: string;
      };
    };
    calories: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    searchText: string;
    totalDaily: totalNutrientsTotlaDaily;
    totalNutrients: totalNutrientsTotlaDaily;
  };
}
export interface FetchRecipesResponse {
  from: number;
  to: number;
  count: number;
  _links: {
    self: {
      href: string;
      title: string;
    };
    next: {
      href: string;
      title: string;
    };
  };
  hits: Recipe[];
  searchText: string;
}

const useRecipes = (searchText: string) => {
  const { newRecipes } = useNewRecipes();

  const query = {
    pageSize: 10,
  };
  const searchQuery = useInfiniteQuery({
    queryKey: [searchText, query],
    queryFn: ({ pageParam = 1 }) =>
      apiClient
        .get<FetchRecipesResponse>(searchText, {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data.hits),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  const combinedRecipes = newRecipes
    ? [...newRecipes, ...(searchQuery.data?.pages ?? []).flat()]
    : searchQuery.data?.pages?.flat() || [];

  return {
    searchQuery: {
      ...searchQuery,
      data: { ...searchQuery.data, pages: [combinedRecipes] },
    },
    combinedRecipes,
  };
};

export default useRecipes;
