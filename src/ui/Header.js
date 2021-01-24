import React from "react";
import styled from "@emotion/styled";

const HeaderBox = styled.header`
  h2 {
    color: ${(props) => props.theme.colors.black.dark};
    font-size: 1.5rem;
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }

  p span {
    color: ${(props) => props.theme.colors.green.hover};
  }
`;

const Header = ({ heading = '', subHeading = '', children }) => {
  return (
    <HeaderBox>
      {heading && subHeading &&
      <React.Fragment>
        <h2>{heading}</h2>
        <p>{subHeading}</p>
      </React.Fragment>}

      {heading && !subHeading && <h2>{heading}</h2>}

      {!heading && !subHeading && children}
    </HeaderBox>
  );
};

export default Header;
