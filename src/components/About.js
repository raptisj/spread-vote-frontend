import React from "react";
import { Box } from "@chakra-ui/core";
import styled from "@emotion/styled";

const Container = styled(Box)`
  position: relative;
  background: #e6eaed;
  padding: 32px 32px 32px 0;
  border-radius: 4px;
  min-height: 200px;
  grid-row: 1 / 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    ${"" /* background: #e6eaed; */}
    background: linear-gradient(270deg, rgba(230,234,237,1) 0%, rgba(246,248,249,1) 20%, rgba(246,248,249,1) 100%);
    width: calc(50vw);
    left: -50vw;
    height: 100%;
  }

  h2 {
    margin-bottom: 16px;
  }

  p {
    margin-top: 16px;
  }
`;

const About = () => {
  return (
    <Container>
      <h2>About Tell Joe</h2>
      <p>
        A petition app to vote your favorite guest for the Joe Rogan Experience.
        As a fan of the podcast I couldn't find a place to vote for guest. Vote
        for your favorite guest and smash that button.
      </p>

      <p>See who is trending and what category is the most in demand.</p>
    </Container>
  );
};

export default About;
