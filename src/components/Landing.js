import React, { useEffect } from "react";
import TrendingGuest from "./TrendingGuest";
import About from "./About";
import Categories from "./Categories";
import { Box, Grid } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, currentUser } from "../redux/slices/auth";
import GlobalSpinner from "../ui/GlobalSpinner";
import { getSinglePodcast, selectPodcastById } from "../redux/slices/podcasts";
import { useParams } from "react-router-dom";
import EmptyTrending from "../screens/EmptyTrending";
import GoBack from "../ui/GoBack";
import Layout from "../screens/Layout";
import { isEmpty } from "../utils/helperFunctions";
import styled from "@emotion/styled";

// const categoryData = [
//   {
//     id: "comedy",
//     label: "comedy",
//     value: 21,
//     color: '#19c39c'
//   },
//   {
//     id: "politics",
//     label: "politics",
//     value: 47,
//     color: 'red'
//   },
//   {
//     id: "science",
//     label: "science",
//     value: 52,
//     color: 'blue'
//   },
//   {
//     id: "conspiracy",
//     label: "conspiracy",
//     value: 15,
//   },
// ];


// const PodcastBackground = styled.div`
//   background-image: url(${props => props.url}); 
//   height: 400px;
//   background-repeat: no-repeat;
//   background-size: cover;
// ` 

const Landing = () => {
  const dispatch = useDispatch();
  const { podId } = useParams();
  const { token, isAuthenticated, user, loading } = useSelector(authSelector);
  const singlePodcast = useSelector((state) => selectPodcastById(state, podId))
  const podcastLoading = useSelector(state => state.podcasts.loading);
  
  useEffect(() => {
    dispatch(getSinglePodcast(podId));
    
    isAuthenticated && dispatch(currentUser(token));
  }, [dispatch, token, isAuthenticated, podId]);
  
  if (isAuthenticated) {
    if (loading || user === null) return <GlobalSpinner />;
  }
  
  if (loading || podcastLoading || isEmpty(singlePodcast))
  return <GlobalSpinner />;

  const { category, guests } = singlePodcast

  return (
    <Layout>
      <GoBack />
      {/* <PodcastBackground url="https://ichef.bbci.co.uk/news/976/cpsprodpb/FD0D/production/_112418746_jrelogo-976px.jpg" /> */}
      {guests.length > 0 && (
        <TrendingGuest guests={guests} />
      )}
      {guests.length === 0 && <EmptyTrending />}
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
          <Categories categoryData={category} />
        </Box>
      </Grid>
    </Layout>
  );
};

export default Landing;
