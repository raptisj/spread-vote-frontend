import React from "react";
import { Box } from "@chakra-ui/core";
import LinkButton from "../ui/LinkButton";
import styled from "@emotion/styled";

const Container = styled(Box)`
  display: flex;
  min-height: 80vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 32px;

  h2 {
    margin-bottom: 32px;
    font-size: 40px;
    max-width: 640px;
    text-align: center;
  }
`;

const EmptyDashboard = () => {
  return (
    <Container>
      <h2>You have nothing in your dashboard</h2>
      <LinkButton to="/guests/">Vote your Guest</LinkButton>
    </Container>
  );
};

export default EmptyDashboard;
