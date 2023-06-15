import {
  Input,
  InputGroup,
  InputLeftElement,
  SystemStyleObject,
  useColorMode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchValue, setSearchValue] = useState("");

  const placeholderStyles: SystemStyleObject = {
    color: colorMode === "dark" ? "black" : "black",
    opacity: 0.8,
  };
  const hoverStyles: SystemStyleObject = {
    backgroundColor: colorMode === "dark" ? "blue.100" : "blue.100",
  };

  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
        setSearchValue(" ");
      }}
    >
      <InputGroup>
        <InputLeftElement
          children={
            <BsSearch color={colorMode === "dark" ? "black" : "black"} />
          }
        />
        <Input
          ref={ref}
          borderRadius={5}
          placeholder="Search recipe..."
          variant={"filled"}
          textColor={colorMode === "dark" ? "black" : "black"}
          backgroundColor={colorMode === "dark" ? "blue.50" : "blue.50"}
          _placeholder={placeholderStyles}
          _hover={hoverStyles}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
