import React from "react";
import styled from "@emotion/styled";

const HeaderBox = styled.header`
  h2 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const Header = ({ h2, p }) => {
  return (
    <React.Fragment>
      <HeaderBox>
        <h2>{h2}</h2>
        <p>{p}</p>
      </HeaderBox>
    </React.Fragment>
  );
};

export default Header;
