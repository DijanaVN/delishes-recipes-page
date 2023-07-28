import React, { ReactNode, createContext, useContext, useState } from "react";

type searchTextContext = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

type searchTextProps = {
  children: ReactNode;
};

const SearchTextContext = createContext<searchTextContext>({
  searchText: "",
  setSearchText: () => {},
});

export function useSearchText() {
  return useContext(SearchTextContext);
}

export function SearchTextProvider({ children }: searchTextProps) {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        setSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
