import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  border-radius: 0.25rem;
  font-weight: 600;
  width: auto;
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all 250ms;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  outline: none;
  height: 40px;
  min-width: 2.5rem;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #19c39c;
  cursor: pointer;
  border: 0;
  color: #fff;

  &:hover {
    background-color: #16ab89;
  }
`;

const LinkButton = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default LinkButton;
