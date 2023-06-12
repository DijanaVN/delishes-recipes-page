import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack justifyContent={"space-between"} padding={4}>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text fontFamily={"Parisienne-Regular"} fontWeight={"bold"}>
        {" "}
        {colorMode === "dark" ? "Dark Mode" : "White Mode"}
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
