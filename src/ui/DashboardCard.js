import React from "react";
import CustomButton from "../ui/Button";
import styled from "@emotion/styled";
import { Box, Image, useDisclosure } from "@chakra-ui/core";
import DeleteModal from "../screens/DeleteModal";
import { Link, useParams } from "react-router-dom";

const BackgroundShape = styled.div`
  position: absolute;
  transform: translateY(60px);
  left: 16px;
  height: 40%;
  background: #19c39c10;
  z-index: 0;
  right: 16px;
  top: 16px;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.5s;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: none;
  width: 100%;
  height: 250px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  position: relative;

  &:hover {
    & > div {
      opacity: 1;
      transition: all 0.5s;
      transform: translateY(0px);
    }
  }
`;

const InfoBox = styled(Box)`
  padding: 24px 0;
  border-bottom: 1px solid #e6e6e6;
  z-index: 1;

  h3 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const ButtonBox = styled(Box)`
  p {
    font-size: 16px;
    font-weight: 500;
  }

  span {
    color: #19c39c;
    font-weight: 600;
    font-size: 40px;
    margin-right: 4px;
  }

  && {
    grid-column: 1 / -1;
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }
`;

const DashboardCard = ({ guest, handleUnVote, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, twitter_name, twitter_image, votes, _id, podcast_id } = guest;

  return (
    <Card>
      <BackgroundShape />
      <Box p="16px 0 0 0" borderBottom="1px solid #e6e6e6" zIndex="1">
        <Link to={`/podcasts/${podcast_id}/guests/${_id}`}>
          <Image
            rounded="full"
            size="150px"
            src={twitter_image}
            alt={name}
            margin="0 auto"
            display="block"
            objectFit="cover"
          />
        </Link>
      </Box>
      <InfoBox>
        <Link to={`/podcasts/${podcast_id}/guests/${_id}`}>
          <h3>{name}</h3>
        </Link>
        <p>{twitter_name}</p>
      </InfoBox>

      <ButtonBox>
        <p>
          Votes: <span>{votes && votes.length}</span>
        </p>

        <CustomButton background="#f6f8f9" onClick={() => onOpen()}>
          Revert Vote
        </CustomButton>
      </ButtonBox>

      <DeleteModal
        handleUnVote={handleUnVote}
        name={name}
        id={_id}
        isOpen={isOpen}
        onClose={onClose}
        podcastId={podcast_id}
      />
    </Card>
  );
};

export default DashboardCard;
