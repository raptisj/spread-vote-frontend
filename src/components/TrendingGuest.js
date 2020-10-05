import React from "react";
import { Box, Grid } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import TrendingCard from "../ui/TrendingCard";
import LinkButton from "../ui/LinkButton";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/slices/auth";

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.green.brand};

  &:hover {
    color: ${(props) => props.theme.colors.green.hover};
  }
`;

const Header = styled.header`
  h2 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const TrendingGuest = ({ guests }) => {
  const { user } = useSelector(authSelector);

  return (
    <Box p="32px" margin="0 auto" maxWidth="1280px">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="32px"
      >
        <Header>
          <h2>Trending Guests</h2>
          <p>Here are the most popular guests you have voted.</p>
        </Header>

        <StyledLink to="/guests">View all</StyledLink>
      </Box>
      <Grid templateColumns="repeat(5, 1fr)" gap="16px">
        {guests.map((card, i) => (
          <Link to={`/guests/${card._id}`} key={i}>
            <TrendingCard
              card={card}
              hasVoted={user ? card.votes.includes(user._id) : null}
            />
          </Link>
        ))}
      </Grid>

      <Box textAlign="center" mt="24px">
        <LinkButton to="/vote/">Vote your Guest</LinkButton>
      </Box>
    </Box>
  );
};

export default TrendingGuest;
