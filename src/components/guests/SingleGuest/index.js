import React, { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { guestsSelector, upVoteGuest } from "../../../redux/slices/guests";
import { authSelector, currentUser } from "../../../redux/slices/auth";
import { getSingleGuest } from "../../../redux/slices/guests";
import GoBack from "../../../ui/GoBack";
import GlobalSpinner from "../../../ui/GlobalSpinner";
import Layout from "../../../screens/Layout";
import CustomButton from "../../../ui/Button";
import Styled from './SingleGuest.styled';

const SingleGuest = () => {
  const dispatch = useDispatch();
  const { singleGuest, loading } = useSelector(guestsSelector);
  const { isAuthenticated, user } = useSelector(authSelector);
  const { podId, id } = useParams();

  useEffect(() => {
    dispatch(getSingleGuest(podId, id));

    isAuthenticated && dispatch(currentUser());
  }, [dispatch, id, podId, isAuthenticated]);

  if (loading || singleGuest === null) return <GlobalSpinner />;

  const { name, twitter_name, twitter_image, votes, bio } = singleGuest;

  const handleVote = () => {
    let userData = {
      votes: [user._id],
      podcastId: podId,
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
          <Box display="flex" flexDirection="column" h="100%" pb="16px">
            <Styled.Header>
              <div>
                <h2>{name}</h2>
                <a
                  href={`https://twitter.com/${twitter_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{twitter_name}</h3>
                </a>
              </div>
              <div>
                <Styled.Votes>
                  <span>Votes:</span> {votes && votes.length}
                </Styled.Votes>
              </div>
            </Styled.Header>

            <Styled.Divider />

            {bio && <Styled.Bio>{bio}</Styled.Bio>}
          </Box>
          <Box mt="auto" textAlign="right">
            {isAuthenticated && (
              <CustomButton
                appearance="primary"
                disabled={user ? singleGuest.votes.includes(user._id) : null}
                onClick={() => handleVote()}
                isLoading={loading}
              >
                {user
                  ? singleGuest.votes.includes(user._id)
                    ? "Voted"
                    : "Vote"
                  : null}
              </CustomButton>
            )}
          </Box>
        </Styled.InfoCard>
      </Grid>
    </Layout>
  );
};

export default SingleGuest;
