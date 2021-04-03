import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authSelector, currentUser } from "../../../redux/slices/auth";
import { getSinglePodcast, selectPodcastById } from "../../../redux/slices/podcasts";
import { selectAllGuests } from '../../../redux/slices/guests';
import GlobalSpinner from "../../../ui/GlobalSpinner";
import EmptyTrending from "../../../screens/EmptyTrending";
import GoBack from "../../../ui/GoBack";
import Layout from "../../../screens/Layout";
import { isEmpty } from "../../../utils/helperFunctions";
import About from "./About";
import TrendingGuests from "./TrendingGuests";

const Landing = () => {
  const dispatch = useDispatch();
  const { podId } = useParams();
  const { token, isAuthenticated, user, loading } = useSelector(authSelector);
  const singlePodcast = useSelector((state) => selectPodcastById(state, podId))
  const podcastLoading = useSelector(state => state.podcasts.loading);
  const guestLoading = useSelector(state => state.guests.loading);
  const podcastGuests = useSelector(state => selectAllGuests(state));

  useEffect(() => {
    dispatch(getSinglePodcast(podId));
    
    isAuthenticated && dispatch(currentUser(token));
  }, [dispatch, token, isAuthenticated, podId]);
  
  if (isAuthenticated) {
    if (loading || user === null) return <GlobalSpinner />;
  }
  
  if (loading || podcastLoading || guestLoading || isEmpty(singlePodcast))
  return <GlobalSpinner />;
  
  console.log(singlePodcast)
  return (
    <Layout>
      <GoBack />
      {podcastGuests.length > 0 && ( 
        <TrendingGuests guests={podcastGuests} /> 
      )} 
      {podcastGuests.length === 0 && <EmptyTrending />}
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap="16px"
        p="32px"
        margin="0 auto"
        maxWidth="1280px"
      >
        <About singlePodcast={singlePodcast} />
      </Grid>
    </Layout>
  );
};

export default Landing;
