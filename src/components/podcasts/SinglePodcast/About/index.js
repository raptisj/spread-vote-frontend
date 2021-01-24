import React from "react";
import Styled from './About.styled'

const About = ({ singlePodcast }) => {
  const { name, about } = singlePodcast;
  
  return (
    <Styled.Container>
      <h2>
        About <span> {name} </span>
      </h2>
      <p>{about}</p>
    </Styled.Container>
  );
};

export default About;
