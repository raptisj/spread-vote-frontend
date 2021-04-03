import React from "react";
import { Box, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Card = styled(Box)`
  border: none;
  height: 90px;
  width: 80%;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: all 0.3s;
  border: ${(props) => props.hasVoted ? `1px solid ${props.theme.colors.green.brand}` : null};
  display: flex;
  align-items: center;
  padding: 0 32px;

  h3 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  img {
    transform: scale(1);
    transition: all 0.3s;
  }

  &:hover {
    background: #19c39c10;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.15);
    ${"" /* transform: scale(1.009); */}
    transition: all 0.3s;

    img {
      transform: scale(1.05);
      transition: all 0.3s;
    }
  }

  & > span {
    display: none;
    position: absolute;
    background: ${(props) => props.theme.colors.green.brand};
    color: #fff;
    padding: 8px;
    font-size: 16px;
    top: 0;
    right: 0;
    border-radius: 4px;
    font-weight: 600;
  }

  ${(props) => props.hasVoted && `& > span {display: block;}`}

  h3 {
    font-size: 26px;
    margin-left: 16px;
    color: ${(props) => props.theme.colors.black.dark};
  }

  h3 + p {
    color: ${(props) => props.theme.colors.black.soft};
  }

  p > span {
    color: ${(props) => props.theme.colors.green.brand};
    font-weight: 600;
    font-size: 40px;
    margin-right: 4px;
  }

  p {
    margin-left: 20px;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: flex-end;
  }
`;

const FullWidthCard = ({ hasVoted = false, card }) => {
  const { name, twitter_name, twitter_image, votes } = card;
  return (
    <Card hasVoted={hasVoted}>
      <span>Voted</span>
      <Image
        rounded="9999px"
        w="90px"
        h="90px"
        src="https://img.favpng.com/22/13/24/disk-green-circle-png-favpng-3F6U9MeHGHMTjpQQa3uhewVhx.jpg"
        alt={name}
        display="block"
        p="8px"
        objectFit="cover"
      />
      <Box
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <div>
          <h3>{name}</h3>
          <p>{twitter_name}</p>
        </div>
        <p>
          <span>{votes ? votes.length : 0}</span>
          Votes
        </p>
      </Box>
    </Card>
  );
};

export default FullWidthCard;
