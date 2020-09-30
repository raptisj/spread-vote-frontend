import React, { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuests, guestsSelector } from "../redux/slices/guests";
import { authSelector, currentUser } from "../redux/slices/auth";
import GlobalSpinner from "../ui/GlobalSpinner";
import FullWidthCard from "../ui/FullWidthCard";
import GoBack from "../ui/GoBack";
import Layout from "../screens/Layout";

const AllGuest = () => {
  const dispatch = useDispatch();
  const { guests, loading } = useSelector(guestsSelector);
  const { isAuthenticated, user } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getAllGuests());

    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <GlobalSpinner />;

  return (
    <Layout>
      <GoBack />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <h2>All Guests</h2>
        <Box textAlign="center">
          <LinkButton to="/vote/">Vote your Guest</LinkButton>
        </Box>
      </Box>

      <Grid templateColumns="repeat(1, 1fr)" gap="16px" mt="32px">
        {guests.length > 0 &&
          guests.map((card, i) => (
            <Link to={`/guest/${card._id}`} key={i}>
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
