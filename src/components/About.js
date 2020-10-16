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
    background: linear-gradient(
      270deg,
      rgba(230, 234, 237, 1) 0%,
      rgba(246, 248, 249, 1) 20%,
      rgba(246, 248, 249, 1) 100%
    );
    width: calc(50vw);
    left: -50vw;
    height: 100%;
  }

  h2 {
    margin-bottom: 16px;

    span {
      color: #19c39c;
      font-size: 34px;
    }
  }

  p {
    margin-top: 16px;
  }
`;

const About = ({ singlePodcast }) => {
  const { name, about } = singlePodcast;
  return (
    <Container>
      <h2>
        About <span> {name} </span>
      </h2>
      <p>{about}</p>
    </Container>
  );
};

export default About;
