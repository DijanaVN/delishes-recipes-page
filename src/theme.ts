import { extendTheme } from "@chakra-ui/react";

export const myNewTheme = extendTheme({
  colors: {
    primary: "#62B0BF",
    secondary: "#d5e7b8",
    bluecolor: "#2292C3",
  },
});

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    // Add other theme configurations if needed
  },
});

export default theme;
