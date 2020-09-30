import React, { useState } from "react";
import { Box, Grid } from "@chakra-ui/core";
import LoginForm from "../../ui/LoginForm";
import { authSelector, login } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();
  const { errors, loading } = useSelector(authSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmptyField = email === "" || password === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="16px">
      <Box />

      <Box minHeight="84vh" maxWidth="475px" minWidth="475px" m="0 auto">
        <LoginForm
          handleSubmit={handleSubmit}
          getEmail={setEmail}
          getPassword={setPassword}
          errors={errors}
          isEmptyField={isEmptyField}
          loading={loading}
        />
      </Box>
      <Box />
    </Grid>
  );
};

export default Login;
