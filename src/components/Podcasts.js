import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

// redux
import { authSelector, currentUser } from "../redux/slices/auth";
import { getAllPodcasts, selectAllPodcasts } from "../redux/slices/podcasts";

// ui
import GlobalSpinner from "../ui/GlobalSpinner";
import PodcastCard from "../ui/PodcastCard";
import Layout from "../screens/Layout";
import { Link } from "react-router-dom";
// import { isEmpty } from "../utils/helperFunctions";

const Header = styled.header`
  h2 {
      color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const Podcasts = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user, loading } = useSelector(authSelector);
  const podcasts = useSelector(selectAllPodcasts);
  const podcastsLoading = useSelector(state => state.podcasts.loading);
  
  useEffect(() => {
    dispatch(getAllPodcasts());
    if (isAuthenticated) {
      dispatch(currentUser(token));
    }
  }, [dispatch, token, isAuthenticated]);
  
  if (isAuthenticated) {
    if (loading || podcastsLoading || user === null) return <GlobalSpinner />;
  }
  if (loading || podcastsLoading || podcasts.length === 0) return <GlobalSpinner />;
  

  return (
    <Layout>
      <Header>
        <h2>Spread Vote help podcaster's connect with their audience.</h2>
        <p>List of all the guests you have voted.</p>
      </Header>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
        gap="16px"
        mt="32px"
      >
        {podcasts.map((podcast, i) => (
          <Link to={`/podcasts/${podcast._id}`} key={i} title={podcast.name}>
            <PodcastCard podcast={podcast} />
          </Link>
        ))}
      </Grid>
    </Layout>
  );
};

export default Podcasts;
