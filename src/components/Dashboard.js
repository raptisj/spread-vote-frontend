import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";

// redux
import { authSelector, currentUser } from "../redux/slices/auth";
import { unVoteGuest } from "../redux/slices/guests";

// ui
import DashboardCard from "../ui/DashboardCard";
import GoBack from "../ui/GoBack";
import GlobalSpinner from "../ui/GlobalSpinner";
import EmptyDashboard from "../screens/EmptyDashboard";
import Layout from "../screens/Layout";
import { useParams } from "react-router-dom";
import { getAllPodcasts, podcastsSelector } from "../redux/slices/podcasts";

const Header = styled.header`
  h2 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const Rows = styled.div`
  padding: 48px 0 0 0;

  & > h3 {
    font-size: 30px;
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(authSelector);
  const { podcasts, loading: podcastsLoader } = useSelector(podcastsSelector);
  const { podId } = useParams();

  useEffect(() => {
    dispatch(getAllPodcasts());
    dispatch(currentUser());
  }, [dispatch, podId]);

  const handleUnVote = (guestId, podcastId) => {
    let userData = {
      votes: [user._id],
      podcastId,
    };

    dispatch(unVoteGuest(userData, guestId, podId));
  };

  if (loading || user === null || podcastsLoader || podcasts === null)
    return <GlobalSpinner />;

  const userGuests = podcasts
    .map((p) =>
      p.guests.filter((u) => u.votes.includes(user._id) || u.votes.length > 0)
    )
    .filter((p) => p.length > 0);

  if (userGuests.length === 0) return <EmptyDashboard />;

  return (
    <Layout>
      <GoBack path={`/podcasts/${podId}`} />

      <Header>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>List of all the guests you have voted.</p>
      </Header>

      {podcasts.length > 0 &&
        podcasts
          .filter(
            (podcast) =>
              podcast.guests.length > 0 &&
              podcast.guests.map((p) => p.votes.includes(user._id))
          )
          .map((podcast, i) => (
            <Rows key={i}>
              <h3>{podcast.name}</h3>
              <Grid templateColumns="repeat(3, 1fr)" gap="16px" mt="32px">
                {podcast.guests.length > 0 &&
                  podcast.guests
                    .filter((p) => p.votes.includes(user._id))
                    .map((guest, i) => (
                      <DashboardCard
                        key={i}
                        guest={guest}
                        loading={loading}
                        handleUnVote={handleUnVote}
                      />
                    ))}
              </Grid>
            </Rows>
          ))}
    </Layout>
  );
};

export default Dashboard;
