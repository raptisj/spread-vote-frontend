import React from 'react';
import { Box } from "@chakra-ui/react";
import Styled from './InformationCard.styled';

const InformationCard = ({ name, twitterName, votes, bio }) => {

  return (
    <Box display="flex" flexDirection="column" h="100%" pb="16px">
    <Styled.Header>
      <div>
        <h2>{name}</h2>
        <a
          href={`https://twitter.com/${twitterName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>{twitterName}</h3>
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
  )
}

export default InformationCard;
