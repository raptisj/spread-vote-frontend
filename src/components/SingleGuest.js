import React, { useEffect } from "react";
import { Box, Grid, Button } from "@chakra-ui/core";
import styled from "@emotion/styled";
import CustomButton from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { guestsSelector, upVoteGuest } from "../redux/slices/guests";
import { authSelector, currentUser } from "../redux/slices/auth";
import { getSingleGuest } from "../redux/slices/guests";
import GoBack from "../ui/GoBack";
import GlobalSpinner from "../ui/GlobalSpinner";
import Layout from "../screens/Layout";

const InfoCard = styled(Box)`
  background: #fff;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);

  h3 {
    color: ${(props) => props.theme.colors.green.brand};
  }

  p:last-child {
    color: #718096;
    font-size: 0.875rem;
    margin-top: auto;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e6e6;
  margin: 2rem 0;
`;

const Bio = styled.p`
  padding: 16px;
  background: #19c39c20;
  margin-top: 16px;
  border-radius: 4px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 3px;
    background: ${(props) => props.theme.colors.green.brand};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Votes = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  color: #19c39c;
  font-size: 36px;
  padding: 0 10px;

  span {
    color: #333;
    font-size: 20px;
    display: inline-block;
    margin: 0 4px;
  }
`;

const SingleGuest = (props) => {
  const dispatch = useDispatch();
  const { singleGuest, loading } = useSelector(guestsSelector);
  const { isAuthenticated, user } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getSingleGuest(props.match.params.id));
    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, props.match.params.id, isAuthenticated]);

  if (singleGuest === null) return <GlobalSpinner />;
  const { name, twitterName, twitterImage, votes, bio } = singleGuest;

  const handleVote = () => {
    let userData = {
      votes: [user._id],
    };

    dispatch(upVoteGuest(userData, singleGuest._id));
  };

  return (
    <Layout>
      <GoBack path="/guests/" />

      <Grid templateColumns="1fr 26px 1fr" gap="16px">
        <Box w="100%" gridColumn="1 / 3">
          <img
            src={twitterImage}
            alt="user"
            style={{
              display: "flex",
              borderRadius: "4px",
              marginLeft: "auto",
            }}
          />
        </Box>
        <InfoCard
          p="16px"
          display="flex"
          flexDirection="column"
          gridColumn="2 /4"
          mt="-272px"
        >
          <Box display="flex" flexDirection="column" h="100%" pb="16px">
            <Header>
              <div>
                <h2>{name}</h2>
                <h3>{twitterName}</h3>
              </div>
              <div>
                <Votes>
                  <span>Votes:</span> {votes.length}
                </Votes>
              </div>
            </Header>

            <Divider />

            <Bio>{bio}</Bio>
            <p>Has appeared before in the show</p>
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
        </InfoCard>
      </Grid>
    </Layout>
  );
};

export default SingleGuest;
