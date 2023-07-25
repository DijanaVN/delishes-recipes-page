import React from "react";

interface searchTextContext {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const searchTextContext = React.createContext<searchTextContext>(
  {} as searchTextContext
);

export default searchTextContext;
