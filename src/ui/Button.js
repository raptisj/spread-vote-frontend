import React from "react";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import theme from "../theme";

const StyledButton = styled(Button)`
  display: flex;

  &:hover {
    background-color: ${(props) =>
      props.appearance === "primary"
        ? theme.colors.green.hover
        : theme.colors.red.hover};
  }
`;

const CustomButton = ({
  children,
  color,
  width = null,
  type = "button",
  appearance,
  margin,
  disabled,
  onClick,
  isLoading,
}) => {
  return (
    <StyledButton
      type={type}
      appearance={appearance}
      fontSize="1rem"
      fontWeight="600"
      height="40px"
      cursor="pointer"
      display="block"
      m={margin}
      disabled={disabled}
      isLoading={isLoading}
      bg={
        appearance === "primary"
          ? theme.colors.green.brand
          : theme.colors.red.customRed
      }
      border="none"
      color={appearance === "primary" ? theme.colors.white : theme.colors.white}
      width={width === "full" ? "100%" : "auto"}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
