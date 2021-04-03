import React, { useEffect, useState } from "react";
import { Box, Grid, Input, Tag } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, currentUser } from "../../../redux/slices/auth";
// import { getSinglePodcast, selectPodcastById } from "../../../redux/slices/podcasts";
import { getAllGuests, selectAllGuests, publishedGuestsSelector, guestsSelector } from "redux/slices/guests";
// import { selectAllGuests } from '../../../redux/slices/guests';
import styled from "@emotion/styled";
import Fuse from "fuse.js";
import LinkButton from "../../../ui/LinkButton";
import GlobalSpinner from "../../../ui/GlobalSpinner";
import FullWidthCard from "../../../ui/FullWidthCard";
import GoBack from "../../../ui/GoBack";
import Layout from "../../../screens/Layout";
import { sortElements } from "../../../utils/helperFunctions";
import Header from "../../../ui/Header";
// import Toasts from "ui/Toasts";

const MainInput = styled(Input)`
  border: 1px solid #e6e6e6;
  background: #fff;
`;

const StyledTag = styled(Tag)`
  cursor: pointer;
`

// fuse stuff
// const keys = {
//   NAME: "name",
//   TWITTER_NAME: "twitterName",
// };

// const { NAME, TWITTER_NAME } = keys;

// const fuseOptions = {
//   shouldSort: true,
//   threshold: 0.4,
//   location: 0,
//   minMatchCharLength: 3,
//   keys: [NAME, TWITTER_NAME],
// };

const AllGuest = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(authSelector);
  const guestLoading = useSelector(state => state.guests.loading);
  const guests = useSelector(state => selectAllGuests(state).filter(guest => guest.state !== 'hidden'));
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getAllGuests());
    
    isAuthenticated && dispatch(currentUser());
  }, [dispatch, isAuthenticated]);
  
  if (guestLoading) return <GlobalSpinner />;
  
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  
  // const fuse = new Fuse(guests, fuseOptions);
  // const searchResults = query
  // ? fuse.search(query).map((p) => p.item)
  // : guests;
  
  
  return (
    <Layout>
      <GoBack path={`/podcasts/`} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <Header heading="All Guests" />
      </Box>

      <Grid templateColumns="1fr 1fr">
        <div>

        </div>
        <div>
          <MainInput
            type="text"
            id="name"
            aria-describedby="guest-name"
            boxSizing="border-box"
            onChange={(e) => onChange(e)}
          />
        </div>
      </Grid>

      <Grid templateColumns="repeat(1, 1fr)" gap="16px" mt="32px">
        {guests.length > 0 &&
          guests.map((card, i) => (
            <Link to={`/podcasts/guests/${card._id}`} key={i}>
              <FullWidthCard
                card={card}
                // hasVoted={user ? card.votes.includes(user._id) : null}
              />
            </Link>
          ))}
      </Grid>
    </Layout>
  );
};

export default AllGuest;
