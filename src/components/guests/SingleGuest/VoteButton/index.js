import React from 'react';
import { Box } from "@chakra-ui/react";
import CustomButton from '../../../../ui/Button';

const VoteButton = ({ isAuthenticated, singleGuest, user, handleVote, loading }) => (
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
);

export default VoteButton;