import React from "react";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box margin="0 auto" maxWidth="1280px" p="32px" minHeight="86vh">
      {children}
    </Box>
  );
};

export default Layout;
