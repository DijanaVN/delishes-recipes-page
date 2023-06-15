import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    primary: "#62B0BF",
    secondary: "#d5e7b8",
    bluecolor: "#2292C3",
  },
});

export default theme;
