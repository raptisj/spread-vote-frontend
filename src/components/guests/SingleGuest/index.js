import React, { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { guestsSelector, upVoteGuest } from "../../../redux/slices/guests";
import { authSelector, currentUser } from "../../../redux/slices/auth";
import { getSingleGuest } from "../../../redux/slices/guests";
import GoBack from "../../../ui/GoBack";
import GlobalSpinner from "../../../ui/GlobalSpinner";
import Layout from "../../../screens/Layout";
import Styled from './SingleGuest.styled';
import InformationCard from "./InformationCard";
import VoteButton from "./VoteButton";
import Header from '../../../ui/Header';

const SingleGuest = () => {
  const dispatch = useDispatch();
  const { singleGuest, loading, podcastsInGuest } = useSelector(guestsSelector);
  const { isAuthenticated, user } = useSelector(authSelector);
  const { podId, id } = useParams();

  
  useEffect(() => { 
    dispatch(getSingleGuest(id));
    
    isAuthenticated && dispatch(currentUser());
  }, [dispatch, id, isAuthenticated]);
  
  if (loading || singleGuest === null) return <GlobalSpinner />;
  
  // console.log(singleGuest.podcasts.find(podcast => podcast._id === podId).votes.length)
  // console.log(singleGuest.podcasts.find(podcast => podcast._id === podId).votes.includes(user._id))

  const { name, twitter_name, twitter_image, votes, bio } = singleGuest;

  const handleVote = () => {
    let userData = {
      votes: [user._id],
      podcastId: podId,
      userId: user._id
    };

    dispatch(upVoteGuest(userData, singleGuest._id));
  };

  return (
    <Layout>
      <GoBack path={`/podcasts/${podId}/guests/`} />

      <Grid templateColumns="1fr 26px 1fr" gap="16px">
        <Box w="100%" gridColumn="1 / 3">
          <img
            src={twitter_image}
            alt="user"
            style={{
              display: "flex",
              borderRadius: "4px",
              marginLeft: "auto",
            }}
          />
        </Box>

        <Styled.InfoCard
          p="16px"
          display="flex"
          flexDirection="column"
          gridColumn="2 /4"
          mt="-272px"
        >

        <InformationCard name={name} twitterName={twitter_name} votes={votes} bio={bio} />

        <VoteButton 
          isAuthenticated={isAuthenticated} 
          singleGuest={singleGuest} 
          user={user} 
          handleVote={handleVote} 
          loading={loading} 
        />

        </Styled.InfoCard>
      </Grid>

      <Box pt="6rem" pb="4rem">
        <Header>
          <h2>This guest in other podcasts</h2>
          <p><span>{name}</span> has appeared in these podcast's.</p>
        </Header>

          <Grid templateColumns="1fr 1fr" gap="16px" pt="4rem">
            {podcastsInGuest.map(podcast => 
              <React.Fragment key={podcast._id}>
                {podId !== podcast._id && (
                  <Styled.SmallFullCard key={podcast._id}>
                    <h3>{podcast.name}</h3>
                  </Styled.SmallFullCard>
                  )}
                  {(podcastsInGuest.length === 0 || (podcastsInGuest.length === 1 && podId === podcast._id)) && (
                    <p>This guest hasn't appeared in any other podcasts.</p>
                  )}
                </React.Fragment>
              )}
          </Grid>
      </Box>
    </Layout>
  );
};

export default SingleGuest;
