import React from "react";
import { Box, Input, Grid, FormControl, FormLabel } from "@chakra-ui/core";
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

  p {
    color: ${(props) => props.theme.colors.red.customRed};
    text-align: center;
  }
`;

const SignUpForm = ({
  handleSubmit,
  getFirstName,
  getLastName,
  getEmail,
  getPassword,
  hasErrors,
  isEmptyField,
  loading,
}) => {
  return (
    <Card>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Grid templateColumns="repeat(2, 1fr)" gap="16px">
            <Box>
              <FormLabel htmlFor="firstName">FIRST NAME</FormLabel>
              <Input
                type="text"
                id="firstName"
                aria-describedby="type-first-name"
                boxSizing="border-box"
                onChange={(e) => getFirstName(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="lastName">LATEST NAME</FormLabel>
              <Input
                type="text"
                id="lastName"
                aria-describedby="type-last-name"
                boxSizing="border-box"
                onChange={(e) => getLastName(e.target.value)}
              />
            </Box>
          </Grid>

          <FormLabel htmlFor="email">EMAIL</FormLabel>
          <Input
            type="email"
            id="email"
            aria-describedby="type-email"
            boxSizing="border-box"
            onChange={(e) => getEmail(e.target.value)}
          />

          <FormLabel htmlFor="password">PASSWORD</FormLabel>

          <PasswordInput onChange={(e) => getPassword(e.target.value)} />
        </FormControl>

        {hasErrors && <p>Email is already register.</p>}

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

export default SignUpForm;
