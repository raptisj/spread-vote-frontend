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

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const handleUnVote = (guestId) => {
    let userData = {
      votes: [user._id],
    };

    dispatch(unVoteGuest(userData, guestId));
  };

  if (loading || user === null) return <GlobalSpinner />;
  if (user.guests.length === 0) return <EmptyDashboard />;
  const podcastNames = user.guests.map((p) => p);

  return (
    <Layout>
      <GoBack />

      <Header>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>List of all the guests you have voted.</p>
      </Header>

      {user.guests.length > 0 &&
        podcastNames.map((podcast, i) => (
          <Rows key={i}>
            <h3>{podcast.podcast_name}</h3>

            <Grid templateColumns="repeat(3, 1fr)" gap="16px" mt="32px">
              {user.guests
                .filter((guest) => guest.podcast_id === podcast.podcast_id)
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
