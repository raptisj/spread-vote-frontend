import React from "react";
import styled from "@emotion/styled";
import ArrowLeft from "../icons/ArrowLeft";
import { Link } from "react-router-dom";

const TopLink = styled.div`
  & > a {
    color: ${(props) => props.theme.colors.green.brand};
    display: inline-flex;
    align-items: center;
    margin-bottom: 16px;

    svg {
      stroke: #19c39c;
      transition: all 0.3s;
    }

    &:hover {
      color: ${(props) => props.theme.colors.green.hover};

      svg {
        stroke: ${(props) => props.theme.colors.green.hover};
        transform: translateX(-4px);
        transition: all 0.3s;
      }
    }
  }
`;

const GoBack = ({ path = "/" }) => {
  return (
    <TopLink>
      <Link to={path}>
        <ArrowLeft width={26} height={26} />
        Go Back
      </Link>
    </TopLink>
  );
};

export default GoBack;
