import React from "react";
import { Box, Input, FormControl, FormLabel } from "@chakra-ui/core";
import styled from "@emotion/styled";
import CustomButton from "./Button";
import PasswordInput from "../ui/PasswordInput";

const Card = styled(Box)`
  background: #fff;
  margin-top: 8rem;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);

  h2 {
    margin-bottom: 24px;
    font-size: 30px;
  }

  label {
    font-size: 14px;
    color: #717277;
    font-weight: normal;
  }

  input {
    margin-bottom: 16px;
    border: 1px solid #e6e6e6;
  }
`;

const ErrorMessage = styled.p`
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.red.customRed};
  font-size: 14px;
`;

const LoginForm = ({
  handleSubmit,
  getEmail,
  getPassword,
  errors,
  isEmptyField,
  loading,
}) => {
  // if (errors !== null) {
  // const { email = null, password = null } = errors;
  // }
  // console.log(errors);

  // console.log(errors.password);
  return (
    <Card>
      <h2>Log In</h2>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="email">EMAIL</FormLabel>
          <Input
            type="email"
            id="email"
            aria-describedby="type-email"
            boxSizing="border-box"
            onChange={(e) => getEmail(e.target.value)}
          />
          <ErrorMessage>{errors !== null ? errors.email : ""}</ErrorMessage>

          <FormLabel htmlFor="password">PASSWORD</FormLabel>

          <PasswordInput onChange={(e) => getPassword(e.target.value)} />
          <ErrorMessage>
            {errors && errors.password !== "" && errors.password}
          </ErrorMessage>
        </FormControl>

        <CustomButton
          appearance="primary"
          type="submit"
          width="full"
          margin="24px 0 0 0"
          disabled={isEmptyField}
          isLoading={loading}
        >
          Submit
        </CustomButton>
      </form>
    </Card>
  );
};

export default LoginForm;
