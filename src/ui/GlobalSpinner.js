import React from "react";
import { Spinner, Box } from "@chakra-ui/react";

const GlobalSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      p="32px"
    >
      <Spinner
        thickness="6px"
        speed="0.95s"
        emptyColor="#19c39c07"
        color="#19c39c"
        w="4rem"
        h="4rem"
      />
    </Box>
  );
};

export default GlobalSpinner;
