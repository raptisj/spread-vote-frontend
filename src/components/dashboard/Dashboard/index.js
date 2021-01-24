import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// redux
import { authSelector, currentUser } from "../../../redux/slices/auth";
import { unVoteGuest, currentUserGuests, selectAllGuests } from "../../../redux/slices/guests";
import { getAllPodcasts, selectAllPodcasts } from "../../../redux/slices/podcasts";
// ui
import DashboardCard from "../../../ui/DashboardCard";
import GoBack from "../../../ui/GoBack";
import GlobalSpinner from "../../../ui/GlobalSpinner";
import EmptyDashboard from "../../../screens/EmptyDashboard";
import Layout from "../../../screens/Layout";
import Header from '../../../ui/Header';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { podId } = useParams();

  const { user, userId, loading } = useSelector(authSelector);
  const podcasts = useSelector(selectAllPodcasts);
  const podcastsLoader = useSelector(state => state.podcasts.loading);
  const userGuests = useSelector(state => selectAllGuests(state));

  useEffect(() => {
    dispatch(getAllPodcasts());
    dispatch(currentUser());
    dispatch(currentUserGuests(userId));
  }, [dispatch, podId, userId]);

  const handleUnVote = (guestId, podcastId) => {
    let userData = {
      votes: [user._id],
      podcastId,
    };

    dispatch(unVoteGuest(userData, guestId, podId));
  };

  if (loading || user === null || podcastsLoader || podcasts === null)
    return <GlobalSpinner />;
  
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

        <Grid templateColumns="repeat(3, 1fr)" gap="16px" mt="32px">
          {userGuests.length > 0 &&
            userGuests.map(guest => (
              <DashboardCard
                key={guest._id}
                guest={guest}
                loading={loading}
                handleUnVote={handleUnVote}
              />
            ))}
        </Grid>
    </Layout>
  );
};

export default Dashboard;
