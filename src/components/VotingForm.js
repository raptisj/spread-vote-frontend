import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioButtonGroup,
} from "@chakra-ui/core";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGuests,
  guestsSelector,
  categoryVote,
} from "../redux/slices/guests";
import { authSelector, currentUser } from "../redux/slices/auth";
import styled from "@emotion/styled";
import CustomButton from "../ui/Button";
import { useParams } from "react-router-dom";

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e6e6;
  margin: 2rem 0;
`;

const Radios = styled.div`
  margin-top: 48px;

  legend {
    margin-bottom: 8px;
  }
`;

const ButtonRadios = styled(RadioButtonGroup)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;

  button:focus {
    box-shadow: none;
  }
`;

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "red" : "gray"}
      aria-checked={isChecked}
      role="radio"
      height="30px"
      fontSize="14px"
      isDisabled={isDisabled}
      cursor="pointer"
      border="none"
      {...rest}
    />
  );
});

const VotingForm = () => {
  const [category, setCategories] = useState("Comedy");
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(authSelector);
  const { podId } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(category);
    // dispatch(categoryVote(category, user._id, podId));
  };

  return (
    <Box p="32px" margin="0 auto" maxWidth="1280px">
      <h2>Choose Category</h2>

      <form onSubmit={handleSubmit}>
        <FormControl maxWidth="700px" m="32px 0">
          <Radios>
            <FormLabel as="legend" pb="8px">
              Vote for what type of podcasts you want to see.
            </FormLabel>

            <ButtonRadios
              defaultValue="Comedy"
              onChange={(val) => setCategories(val)}
            >
              <CustomRadio value="comedy">Comedy</CustomRadio>
              <CustomRadio value="politics">Politics</CustomRadio>
              <CustomRadio value="science">Science</CustomRadio>
              <CustomRadio value="conspiracy">Conspiracy</CustomRadio>
            </ButtonRadios>
          </Radios>

          <Divider />

          <FormHelperText id="guest-name">
            <CustomButton appearance="primary" type="submit">
              Vote
            </CustomButton>
          </FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
};

export default VotingForm;
