import React from "react";
import CustomButton from "../ui/Button";
import styled from "@emotion/styled";
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/core";

const ButtonBox = styled(Box)`
  && {
    margin: 0 16px 16px 0;
    grid-column: 1 / -1;
    justify-self: end;
    align-self: end;
  }
`;

const InfoBox = styled(Box)`
  padding: 24px 0;
  border-bottom: 1px solid #e6e6e6;

  h3 {
    margin-bottom: 8px;
  }
`;

const CloseModal = styled.span`
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
`;

const StyledModalHeader = styled.span`
  color: ${(props) => props.theme.colors.green.brand};
  display: inline-block;
  margin-left: 4px;
  font-size: 30px;
`;

const DashboardCard = ({ guest, handleUnVote, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2,1fr)"
      border="none"
      w="100%"
      h="250px"
      bg="#FFFFFF"
      borderRadius="4px"
      boxShadow="0px 3px 5px rgba(0,0,0,0.15)"
    >
      <Box p="16px 0 0 0" borderBottom="1px solid #e6e6e6">
        <Image
          rounded="full"
          size="150px"
          src="https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Segun Adebayo"
          margin="0 auto"
          display="block"
          objectFit="cover"
        />
      </Box>
      <InfoBox>
        <h3>{guest.name}</h3>
        <p>Votes: {guest.votes && guest.votes.length}</p>
        <p>Category: Comedy</p>
      </InfoBox>

      <ButtonBox>
        <CustomButton background="#f6f8f9" onClick={() => onOpen()}>
          Revert Vote
        </CustomButton>
      </ButtonBox>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="32px" borderRadius="4px" minWidth="550px">
          <ModalHeader>
            Are you sure you want to unvote:
            <StyledModalHeader>{guest.name}</StyledModalHeader>
          </ModalHeader>
          <ModalBody>
            You are no longer gonna spread love to this guest.
          </ModalBody>

          <ModalFooter alignItems="center" m="16px 0 0 0">
            <CloseModal onClick={onClose}>Close</CloseModal>

            <CustomButton
              appearance="secondary"
              margin="0 0 0 24px"
              onClick={() => handleUnVote(guest._id)}
            >
              Yes, delete guest
            </CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardCard;
