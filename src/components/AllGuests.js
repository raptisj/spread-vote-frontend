import React, { useEffect, useState } from "react";
import { Box, Grid, Input, FormHelperText } from "@chakra-ui/core";
import { Link, useParams } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, currentUser } from "../redux/slices/auth";
import GlobalSpinner from "../ui/GlobalSpinner";
import FullWidthCard from "../ui/FullWidthCard";
import GoBack from "../ui/GoBack";
import Layout from "../screens/Layout";
import styled from "@emotion/styled";
import Fuse from "fuse.js";
import { sortElements } from "../utils/helperFunctions";
import { getSinglePodcast, selectPodcastById } from "../redux/slices/podcasts";

const MainInput = styled(Input)`
  border: 1px solid #e6e6e6;
`;

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

const AllGuest = () => {
  const dispatch = useDispatch();
  const { podId } = useParams();

  const { isAuthenticated, user } = useSelector(authSelector);
  const singlePodcast = useSelector((state) => selectPodcastById(state, podId))
  const loading = useSelector(state => state.podcasts.loading)
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getSinglePodcast(podId));

    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, isAuthenticated, podId]);

  if (loading || singlePodcast === undefined) return <GlobalSpinner />;

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const fuse = new Fuse(singlePodcast.guests, fuseOptions);
  const searchResults = query
    ? fuse.search(query).map((p) => p.item)
    : singlePodcast.guests;

  return (
    <Layout>
      <GoBack path={`/podcasts/${podId}`} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <h2>All Guests</h2>
        <Box textAlign="center">
          <LinkButton to={`/podcasts/${podId}/add-guest/`}>
            Add new Guest
          </LinkButton>
        </Box>
      </Box>

      <Grid templateColumns="1fr 1fr">
        <div></div>
        <div>
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
        </div>
      </Grid>

      <Grid templateColumns="repeat(1, 1fr)" gap="16px" mt="32px">
        {singlePodcast.guests.length > 0 &&
          sortElements([...searchResults]).map((card, i) => (
            <Link to={`/podcasts/${podId}/guests/${card._id}`} key={i}>
              <FullWidthCard
                card={card}
                hasVoted={user ? card.votes.includes(user._id) : null}
              />
            </Link>
          ))}
      </Grid>
    </Layout>
  );
};

export default AllGuest;
