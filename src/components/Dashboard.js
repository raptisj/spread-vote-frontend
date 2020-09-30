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

  if (user === null) return <GlobalSpinner />;

  if (user.guests.length === 0) return <EmptyDashboard />;

  return (
    <Layout>
      <GoBack />

      <Header>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>List of all the guests you have voted.</p>
      </Header>
      <Grid templateColumns="repeat(2, 1fr)" gap="16px" mt="32px">
        {user.guests.map((guest, i) => (
          <DashboardCard
            guest={guest}
            key={i}
            handleUnVote={handleUnVote}
            loading={loading}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
