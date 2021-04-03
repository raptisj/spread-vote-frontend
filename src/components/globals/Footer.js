import React from "react";
import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      borderTop="1px solid #e6e6e6"
      p="16px 32px"
      margin="0 auto"
      maxWidth="1280px"
    >
      <p style={{ color: "#717277", fontSize: "14px" }}>SpreadVote @2021</p>
    </Box>
  );
};

export default Footer;
