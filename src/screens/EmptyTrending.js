import React from "react";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import LinkButton from "../ui/LinkButton";
import { useParams } from "react-router-dom";

const Container = styled(Box)`
  display: flex;
  min-height: 300px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 32px;

  h2 {
    margin-bottom: 32px;
    font-size: 30px;
    max-width: 640px;
    text-align: center;
  }
`;

const EmptyTrending = () => {
  const { podId } = useParams();

  return (
    <Container>
      <h2>This podcasts has no guests yet.</h2>
      <LinkButton to={`/podcasts/${podId}/add-guest`}>
        Add your Guest
      </LinkButton>
    </Container>
  );
};

export default EmptyTrending;
