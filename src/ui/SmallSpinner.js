import React from "react";
import { Spinner } from "@chakra-ui/core";

const SmallSpinner = ({ color = "#19c39c" }) => {
  return (
    <Spinner
      thickness="3px"
      speed="0.95s"
      emptyColor="#19c39c07"
      color="#19c39c"
      size="2rem"
    />
  );
};

export default SmallSpinner;

// <CircularProgress isIndeterminate color="#19c39c"></CircularProgress>;
