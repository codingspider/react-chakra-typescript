import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../src/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
