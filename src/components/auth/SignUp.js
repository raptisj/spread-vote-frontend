import React, { useState } from "react";
import { Box, Grid } from "@chakra-ui/core";
import SignUpForm from "../../ui/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { signUp, authSelector } from "../../redux/slices/auth";
import Layout from "../../screens/Layout";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const { errors, loading } = useSelector(authSelector);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { state = "/" } = useLocation()
  const { customPath } = typeof state === 'string' ? {customPath: '/'} : state 

  const isEmptyField =
    email === "" || password === "" || firstName === "" || lastName === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };

    dispatch(signUp(userData, customPath));
  };

  return (
    <Layout>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px">

        <Box  
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
            isEmptyField={isEmptyField}
            loading={loading}
            errors={errors}
          />
        </Box>

      </Grid>
    </Layout>
  );
};

export default SignUp;
