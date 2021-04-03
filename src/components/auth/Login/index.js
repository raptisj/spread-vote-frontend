import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, login, resetErrors } from "../../../redux/slices/auth";
import Layout from "../../../screens/Layout";
import LoginForm from "./LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const { errors, loading } = useSelector(authSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state = "/" } = useLocation()
  const { customPath } = typeof state === 'string' ? {customPath: '/'} : state 

  const isEmptyField = email === "" || password === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData, customPath));
  };

  useEffect(() => {
    dispatch(resetErrors())
  }, [dispatch])


  return (
    <Layout>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px">
        <Box />

        <Box  maxWidth="475px" minWidth="475px" m="0 auto">
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
    </Layout>
  );
};

export default Login;
