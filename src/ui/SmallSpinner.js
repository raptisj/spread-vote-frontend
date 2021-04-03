import React from "react";
import { Spinner } from "@chakra-ui/react";

const SmallSpinner = ({ color = "#19c39c" }) => {
  return (
    <Spinner
      thickness="3px"
      speed="0.95s"
      emptyColor="#19c39c07"
      color="#19c39c"
      w="2rem"
      h="2rem"
    />
  );
};

export default SmallSpinner;
