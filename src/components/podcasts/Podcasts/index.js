import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// redux
import { authSelector, currentUser } from "../../../redux/slices/auth";
import { getAllPodcasts, selectAllPodcasts } from "../../../redux/slices/podcasts";
// ui
import GlobalSpinner from "../../../ui/GlobalSpinner";
import PodcastCard from "../../../ui/PodcastCard";
import Layout from "../../../screens/Layout";
import Header from '../../../ui/Header';
// constants
import { headersContent } from '../../../constants/contents';

const Podcasts = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user, loading } = useSelector(authSelector);
  const podcasts = useSelector(selectAllPodcasts);
  const podcastsLoading = useSelector(state => state.podcasts.loading);
  
  useEffect(() => {
    dispatch(getAllPodcasts());

    isAuthenticated && dispatch(currentUser(token));    
  }, [dispatch, token, isAuthenticated]);
  
  if (isAuthenticated) {
    if (loading || podcastsLoading || user === null) return <GlobalSpinner />;
  }
  if (loading || podcastsLoading || podcasts.length === 0) return <GlobalSpinner />;
  

  return (
    <Layout>
      <Header 
        heading={headersContent.PODCAST_HEADER} 
        subHeading={headersContent.PODCAST_SUBHEADER} 
      />

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
        gap="16px"
        mt="32px"
      >
        {podcasts.map(podcast => (
          <Link to={`/podcasts/${podcast._id}`} key={podcast._id} title={podcast.name}>
            <PodcastCard podcast={podcast} />
          </Link>
        ))}
      </Grid>
    </Layout>
  );
};

export default Podcasts;
