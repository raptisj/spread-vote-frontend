import React from "react";
import CustomButton from "../ui/Button";
import styled from "@emotion/styled";
import { Box, Image, useDisclosure } from "@chakra-ui/core";
import DeleteModal from "../screens/DeleteModal";
import { Link } from "react-router-dom";

const Card = styled(Box)`
  border: none;
  height: 100px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: all 0.3s;
  border: ${(props) =>
    props.hasVoted ? `1px solid ${props.theme.colors.green.brand}` : null};
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
    font-size: 40px;
    margin-left: 16px;
    color: ${(props) => props.theme.colors.black.dark};
    font-weight: 100;
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
const PodcastCard = ({ podcast }) => {
  const { name, _id } = podcast;

  return (
    <Card>
      {/* <Image
        rounded="9999px"
        size="90px"
        src={twitterImage}
        alt={name}
        display="block"
        p="8px"
        objectFit="cover"
      /> */}
      <Box
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <div>
          <h3>{name}</h3>
        </div>
      </Box>
    </Card>
  );
};

export default PodcastCard;
