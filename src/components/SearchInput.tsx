import {
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SystemStyleObject,
  useColorMode,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  searchText: z
    .string()
    .min(3, { message: "Search input must be at least 3 characters." }),
});

interface Props {
  onSearch: (searchText: string) => void;
}

interface FormData {
  searchText: string;
}

const SearchInput = ({ onSearch }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    onSearch(data.searchText);
    reset();
  };

  const { colorMode } = useColorMode();

  const placeholderStyles: SystemStyleObject = {
    color: colorMode === "dark" ? "black" : "black",
    opacity: 0.8,
  };
  const hoverStyles: SystemStyleObject = {
    backgroundColor: colorMode === "dark" ? "blue.100" : "blue.100",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={
            <BsSearch color={colorMode === "dark" ? "black" : "black"} />
          }
        />

        <Input
          paddingLeft={10}
          {...register("searchText")}
          borderRadius={5}
          placeholder="Search recipe..."
          variant={"filled"}
          textColor={colorMode === "dark" ? "black" : "black"}
          backgroundColor={colorMode === "dark" ? "blue.50" : "blue.50"}
          _placeholder={placeholderStyles}
          _hover={hoverStyles}
        />
        <InputRightElement width="2.5rem">
          <Button
            type="submit"
            h="100%"
            size="sm"
            borderRadius="5"
            bgColor={colorMode === "dark" ? "blue.100" : "blue.100"}
            color={colorMode === "dark" ? "black" : "black"}
          >
            <BsSearch />
          </Button>
        </InputRightElement>

        {errors.searchText && (
          <Text paddingLeft={2} color={"yellow"}>
            {errors.searchText.message}
          </Text>
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
