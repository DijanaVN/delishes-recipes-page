import { Button, Text } from "@chakra-ui/react";

import { FaRegBookmark } from "react-icons/fa";
import BookmarkedList from "./BookmarkedList";

const AddBookmark = () => {
  return (
    <Button rounded="full">
      <FaRegBookmark fontSize="180%" />
      <Text paddingLeft={2}>Bookmarks</Text>
      <BookmarkedList bookmarkedRecipes={[]} />
    </Button>
  );
};

export default AddBookmark;
