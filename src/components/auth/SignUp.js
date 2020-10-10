import React, { useState } from "react";
import { Box, Grid } from "@chakra-ui/core";
import SignUpForm from "../../ui/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { signUp, authSelector } from "../../redux/slices/auth";

const SignUp = (props) => {
  const { hasErrors, loading } = useSelector(authSelector);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isEmptyField =
    email === "" || password === "" || firstName === "" || lastName === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };

    dispatch(signUp(userData));
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="16px">
      {/* <Box /> */}

      <Box
        minHeight="84vh"
        maxWidth="475px"
        minWidth="475px"
        m="0 auto"
        gridColumn="2 / 3"
      >
        <SignUpForm
          handleSubmit={handleSubmit}
          getFirstName={setFirstName}
          getLastName={setLastName}
          getEmail={setEmail}
          getPassword={setPassword}
          hasErrors={hasErrors}
          isEmptyField={isEmptyField}
          loading={loading}
        />
      </Box>

      {/* <Box /> */}
    </Grid>
  );
};

export default SignUp;
