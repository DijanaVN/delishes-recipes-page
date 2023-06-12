import {
  Input,
  InputGroup,
  InputLeftElement,
  SystemStyleObject,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const placeholderStyles: SystemStyleObject = {
    color: colorMode === "dark" ? "black" : "black",
    opacity: 0.8,
  };
  const hoverStyles: SystemStyleObject = {
    backgroundColor: colorMode === "dark" ? "secondary" : "secondary",
  };

  return (
    <InputGroup>
      <InputLeftElement
        children={<BsSearch color={colorMode === "dark" ? "black" : "black"} />}
      />
      <Input
        borderRadius={5}
        placeholder="Search recipe..."
        variant={"filled"}
        backgroundColor={colorMode === "dark" ? "blue.50" : "blue.50"}
        _placeholder={placeholderStyles}
        _hover={hoverStyles}
      />
    </InputGroup>
  );
};

export default SearchInput;
