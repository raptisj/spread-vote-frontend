import React, { useEffect } from "react";
import TrendingGuest from "./TrendingGuest";
import About from "./About";
import Categories from "./Categories";
import { Box, Grid } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, currentUser } from "../redux/slices/auth";
import { getTrendingGuests, guestsSelector } from "../redux/slices/guests";
import GlobalSpinner from "../ui/GlobalSpinner";
import { getSinglePodcast, podcastsSelector } from "../redux/slices/podcasts";

const categoryData = [
  {
    id: "comedy",
    label: "comedy",
    value: 281,
    color: "hsl(248, 70%, 50%)",
  },
  {
    id: "politics",
    label: "politics",
    value: 467,
    color: "hsl(149, 70%, 50%)",
  },
  {
    id: "science",
    label: "science",
    value: 572,
    color: "hsl(328, 70%, 50%)",
  },
  {
    id: "conspiracy",
    label: "conspiracy",
    value: 115,
    color: "hsl(93, 70%, 50%)",
  },
];

const Landing = (props) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user, loading } = useSelector(authSelector);
  const { loading: guestLoading, guests } = useSelector(guestsSelector);
  const { loading: podcastLoading, singlePodcast } = useSelector(
    podcastsSelector
  );

  useEffect(() => {
    dispatch(getTrendingGuests());
    dispatch(getSinglePodcast(props.match.params.podId));

    if (isAuthenticated) {
      dispatch(currentUser(token));
    }
  }, [dispatch, token, isAuthenticated, props.match.params.podId]);

  if (isAuthenticated) {
    if (loading || guestLoading || user === null) return <GlobalSpinner />;
  }

  if (loading || guestLoading || podcastLoading || singlePodcast === null)
    return <GlobalSpinner />;

  return (
    <React.Fragment>
      <TrendingGuest guests={guests} />
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap="16px"
        p="32px"
        margin="0 auto"
        maxWidth="1280px"
      >
        <About singlePodcast={singlePodcast} />
        <Box gridRow="1 / -1">
          <Categories categoryData={categoryData} />
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Landing;
