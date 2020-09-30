import React, { useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Image,
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import CustomButton from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  preFetchGuest,
  createGuest,
  guestsSelector,
} from "../redux/slices/guests";

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e6e6;
  margin: 2rem 0;
`;

const MainInput = styled(Input)`
  border: 1px solid #e6e6e6;
`;

const ImageBox = styled.div`
  margin-top: 24px;
  display: inline-block;

  h3 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  span {
    display: block;
    color: ${(props) => props.theme.colors.black.soft};
  }
  p {
    margin-top: 16px;
    padding: 16px;
  }
`;

// @jdnoc
const AddGuest = () => {
  const dispatch = useDispatch();
  const { twitterData, loading } = useSelector(guestsSelector);

  const handlePaste = (e) => {
    let name = e.clipboardData.getData("Text").replace(/[@]/, "");
    const data = {
      name,
    };
    dispatch(preFetchGuest(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      twitterImage: twitterData.twitterImage,
      name: twitterData.name,
      twitterName: twitterData.twitterName,
      bio: twitterData.bio,
    };

    dispatch(createGuest(data));
  };

  return (
    <Box p="32px" margin="0 auto" maxWidth="1280px">
      <h2>Add Guest</h2>
      <form onSubmit={handleSubmit}>
        <FormControl maxWidth="700px" m="32px 0">
          <FormLabel htmlFor="name" pb="8px">
            Guest's Twitter name
          </FormLabel>
          <MainInput
            type="text"
            id="name"
            aria-describedby="guest-name"
            boxSizing="border-box"
            onPaste={(e) => handlePaste(e)}
          />
          <FormHelperText id="guest-name">
            Paste user's Twitter name. Typing it won't work.
          </FormHelperText>

          {twitterData !== null && (
            <ImageBox>
              <Image
                rounded="9999px"
                size="150px"
                src={twitterData.twitterImage}
                alt="Segun Adebayo"
                display="block"
                p="16px"
                objectFit="cover"
              />
              <h3>{twitterData.name}</h3>
              <span>{twitterData.twitterName}</span>
              <p>{twitterData.bio}</p>
            </ImageBox>
          )}

          <Divider />

          <FormHelperText id="guest-name">
            <CustomButton
              appearance="primary"
              type="submit"
              isLoading={loading}
            >
              Submit
            </CustomButton>
          </FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddGuest;
