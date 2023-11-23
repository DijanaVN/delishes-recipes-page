import React, { ReactNode, createContext, useContext, useState } from "react";

type SearchTextContext = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

type SearchTextProps = {
  children: ReactNode;
};

const SearchTextContext = createContext<SearchTextContext>({
  searchText: "",
  setSearchText: () => {},
});

export function useSearchText() {
  return useContext(SearchTextContext);
}

export function SearchTextProvider({ children }: SearchTextProps) {
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
