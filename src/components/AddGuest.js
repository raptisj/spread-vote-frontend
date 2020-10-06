import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

import {
  preFetchGuest,
  createGuest,
  getAllGuests,
  guestsSelector,
} from "../redux/slices/guests";
import { currentUser } from "../redux/slices/auth";
import { isEmpty } from "../utils/helperFunctions";
import GlobalSpinner from "../ui/GlobalSpinner";
import { authSelector } from "../redux/slices/auth";
import FullWidthCard from "../ui/FullWidthCard";
import SmallSpinner from "../ui/SmallSpinner";

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

const GuestExistsMsg = styled.p`
  margin: 16px 0;
  color: ${(props) => props.theme.colors.green.brand};
  font-size: 20px;
`;

const ScrapeLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`;

const Body = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
  }
`;

// @jdnoc
const AddGuest = () => {
  const dispatch = useDispatch();
  const { twitterData, loading, scrapeLoader } = useSelector(guestsSelector);
  const { isAuthenticated, user } = useSelector(authSelector);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(getAllGuests());

    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, isAuthenticated]);

  const handlePaste = (e) => {
    let name = e.clipboardData.getData("Text").replace(/[@]/, "");
    setInputValue(name);

    const data = {
      name,
    };
    dispatch(preFetchGuest(data));
  };

  const handleChange = (e) => {
    var keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === 8) {
      setInputValue("");
    } else {
      setInputValue((inputValue) => inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      twitterImage: twitterData.twitterImage,
      name: twitterData.name,
      twitterName: twitterData.twitterName,
      bio: twitterData.bio,
      votes: [user._id],
    };

    dispatch(createGuest(data));
  };

  if (loading || user === null) return <GlobalSpinner />;

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
            onKeyDown={(e) => handleChange(e)}
            onChange={(e) => setInputValue(inputValue)}
            value={inputValue}
          />
          <FormHelperText id="guest-name">
            Paste guest's Twitter name. Typing won't work.
          </FormHelperText>

          <Body>
            <div>
              {twitterData !== null &&
                !isEmpty(twitterData) &&
                !twitterData._id && (
                  <ImageBox>
                    <Image
                      rounded="9999px"
                      size="150px"
                      src={twitterData.twitterImage}
                      alt={twitterData.name}
                      display="block"
                      p="16px"
                      objectFit="cover"
                    />
                    <h3>{twitterData.name}</h3>
                    <span>{twitterData.twitterName}</span>
                    <p>{twitterData.bio}</p>
                  </ImageBox>
                )}

              {twitterData !== null && twitterData._id && (
                <React.Fragment>
                  <GuestExistsMsg>
                    {twitterData.votes.includes(user._id)
                      ? "You have already voted for this guest."
                      : "This guest already exits. Go and vote."}
                  </GuestExistsMsg>

                  <Link to={`/guests/${twitterData._id}`}>
                    <FullWidthCard
                      card={twitterData}
                      hasVoted={
                        user ? twitterData.votes.includes(user._id) : null
                      }
                    />
                  </Link>
                </React.Fragment>
              )}

              {isEmpty(twitterData) && twitterData !== null && (
                <div>Could not find guest</div>
              )}

              {scrapeLoader && (
                <ScrapeLoader>
                  <SmallSpinner />
                </ScrapeLoader>
              )}
            </div>
          </Body>
          <Divider />

          <FormHelperText id="guest-name">
            <CustomButton
              appearance="primary"
              type="submit"
              disabled={
                isEmpty(twitterData) ||
                (twitterData !== null && twitterData._id)
              }
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
