import React from "react";
import styled from "@emotion/styled";
import { Box, Image } from "@chakra-ui/core";

const Card = styled(Box)`
  border: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: all 0.3s;
  border: ${(props) =>
    props.hasVoted ? `1px solid ${props.theme.colors.green.brand}` : null};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8px 32px 24px 32px;

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
    font-size: 24px;
    margin-top: 16px;
    color: ${(props) => props.theme.colors.black.dark};
    font-weight: 100;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  h3 + p {
    color: ${(props) => props.theme.colors.black.soft};
  }

  p > span {
    color: ${(props) => props.theme.colors.green.brand};
    font-weight: 600;
    font-size: 40px;
    margin-left: 6px;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: baseline;
  }
`;
const PodcastCard = ({ podcast }) => {
  const { name, guests } = podcast;

  return (
    <Card>
      <Image
        size="130px"
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt={name}
        display="block"
        p="8px"
        objectFit="cover"
      />
      <Box
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
      >
        <div>
          <h3>{name}</h3>
          <p>
            Guests: <span>{guests.length}</span>
          </p>
        </div>
      </Box>
    </Card>
  );
};

export default PodcastCard;
