import React from "react";
import { CircularProgress } from "@chakra-ui/core";

const SmallSpinner = ({ color = "#19c39c" }) => {
  return <CircularProgress isIndeterminate color={color}></CircularProgress>;
};

export default SmallSpinner;
