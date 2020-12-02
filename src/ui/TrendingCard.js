import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/core";
import styled from "@emotion/styled";
import {
  fetchUpdateTwitterData,
  guestsSelector
} from "../redux/slices/guests";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom' 


const Card = styled(Box)`
  border: none;
  width: 100%;
  height: 250px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: all 0.3s;
  border: ${(props) =>
    props.hasVoted ? `1px solid ${props.theme.colors.green.brand}` : null};

  img {
    transform: scale(1);
    transition: all 0.3s;
  }

  &:hover {
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
    background: #19c39c10;

    img {
      transform: scale(1.019);
      transition: all 0.3s;
    }
  }

  & > span {
    display: none;
    position: absolute;
    background: ${(props) => props.theme.colors.green.brand};
    color: #fff;
    padding: 5px;
    font-size: 13px;
    top: -9px;
    right: -7px;
    border-radius: 4px;
    font-weight: 600;
  }

  ${(props) => props.hasVoted && `& > span {display: block;}`}

  p > span {
    color: ${(props) => props.theme.colors.green.brand};
    font-weight: 600;
    font-size: 24px;
    margin-left: 4px;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImageBox = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 15px;
    left: 0px;
    background: #f6f8f9;
    padding: 10px;
    border-radius: 0 4px 4px 0;
    color: ${(props) => props.theme.colors.green.brand};
    font-weight: 600;
  }
`;

const TrendingCard = ({ hasVoted = false, card }) => {
  const { twitterData } = useSelector(guestsSelector);
  const { twitter_name, twitter_image, votes, name } = card;
  const [err, setErr] = useState(false)
  const dispatch = useDispatch()
  const { podId } = useParams();

  
  const findBrokenImage = (name) => {
 
    setErr(true)

    const data = {
      name,
    };

    dispatch(fetchUpdateTwitterData(data, podId))
 }

// console.log(twitterData)


 let img = err ? 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg' : twitter_image

  return (
    <Card hasVoted={hasVoted}>
      <span>Voted</span>
      <ImageBox>
        <Image
          rounded="9999px"
          size="150px"
          src={img}
          onError={() => findBrokenImage(twitter_name)}
          alt={name}
          margin="0 auto"
          display="block"
          p="16px"
          objectFit="cover"
        />
        <span>{votes.length}</span>
      </ImageBox>
      <Box textAlign="center">
        <h3>{name}</h3>
        <span>{twitter_name}</span>
      </Box>
    </Card>
  );
};

export default TrendingCard;
