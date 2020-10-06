import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioButtonGroup,
} from "@chakra-ui/core";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuests, guestsSelector } from "../redux/slices/guests";
import { authSelector, currentUser } from "../redux/slices/auth";
import styled from "@emotion/styled";
import CustomButton from "../ui/Button";
import LinkButton from "../ui/LinkButton";
import { Link } from "react-router-dom";

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

const MainInput = styled(Input)`
  border: 1px solid #e6e6e6;
`;

const ButtonRadios = styled(RadioButtonGroup)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
`;

const SearchResults = styled(Box)`
  background: ${(props) => props.theme.colors.gray.mid};
  display: flex;
  padding: 10px 16px;
  justify-content: space-between;

  h3 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    font-size: 18px;
    color: ${(props) => props.theme.colors.black.dark};
  }

  &:hover {
    background: #62c49d;

    h3,
    p {
      color: ${(props) => props.theme.colors.white};
    }
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

// fuse stuff
const keys = {
  NAME: "name",
  TWITTER_NAME: "twitterName",
};

const { NAME, TWITTER_NAME } = keys;

const fuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  minMatchCharLength: 3,
  keys: [NAME, TWITTER_NAME],
};

const VotingForm = () => {
  const [query, setQuery] = useState("");
  // const [value, setValue] = React.useState("Comedy");
  const dispatch = useDispatch();
  const { guests, loading } = useSelector(guestsSelector);
  const { isAuthenticated, user } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getAllGuests());

    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, isAuthenticated]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const fuse = new Fuse(guests, fuseOptions);
  const searchResults = query ? fuse.search(query) : null;

  return (
    <Box p="32px" margin="0 auto" maxWidth="1280px">
      <h2>Voting Form</h2>
      {/* <form> */}

      {/* </form> */}
      <FormControl maxWidth="700px" m="32px 0">
        <FormLabel htmlFor="name" pb="8px">
          Search for Guest
        </FormLabel>
        <MainInput
          type="text"
          id="name"
          aria-describedby="guest-name"
          boxSizing="border-box"
          onChange={(e) => onChange(e)}
        />

        <FormHelperText id="guest-name">
          Search either by name or twitter name.
        </FormHelperText>

        {searchResults !== null && (
          <Box mt="24px">
            {searchResults.map((result, i) => (
              <Link to={`/`}>
                <SearchResults>
                  <h3>{result.item.name}</h3>
                  <p>{result.item.votes.length}</p>
                </SearchResults>
              </Link>
            ))}
          </Box>
        )}

        <Divider />

        <FormHelperText id="guest-name">
          Didn't find the guest you were looking for?
        </FormHelperText>

        <FormHelperText id="guest-name">
          <LinkButton to="/add-guest"> Create new Guest</LinkButton>
        </FormHelperText>

        <Radios>
          <FormLabel as="legend" pb="8px">
            Choose Category
          </FormLabel>
          {/* <RadioGroup
            defaultValue="Comedy"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            <Radio value="Comedy">Comedy</Radio>
            <Radio value="Politics">Politics</Radio>
            <Radio value="Art">Art</Radio>
            <Radio value="Conspiracy">Conspiracy</Radio>
          </RadioGroup> */}

          <ButtonRadios
            defaultValue="Comedy"
            onChange={(val) => console.log(val)}
          >
            <CustomRadio value="Comedy">Comedy</CustomRadio>
            <CustomRadio value="Politics">Politics</CustomRadio>
            <CustomRadio value="Science">Science</CustomRadio>
            <CustomRadio value="Conspiracy">Conspiracy</CustomRadio>
          </ButtonRadios>
        </Radios>

        <Divider />

        <FormHelperText id="guest-name">
          <CustomButton appearance="primary" type="submit">
            Vote
          </CustomButton>
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default VotingForm;
