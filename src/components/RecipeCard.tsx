import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Divider,
  CardFooter,
  Button,
  Flex,
} from "@chakra-ui/react";

const RecipeCard = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex
            justifyItems={"center"}
            flexDirection={"column"}
            align={"center"}
          >
            <Text align={"center"}>
              This recipe was carefully designed and tested by Closet Cooking.
              Please check out directions at their website.
            </Text>
            <Button
              padding={2}
              marginTop={5}
              boxSize={"35%"}
              variant="solid"
              colorScheme="blue"
              fontSize={{ base: "xs", md: "md", lg: "lg" }}
            >
              Direction ---{">"}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecipeCard;
