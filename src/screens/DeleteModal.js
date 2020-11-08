import React from "react";
import styled from "@emotion/styled";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/core";
import CustomButton from "../ui/Button";

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

const DeleteModal = ({
  handleUnVote,
  name,
  id,
  isOpen,
  onClose,
  podcastId,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="32px" borderRadius="4px" minWidth="550px">
        <ModalHeader>
          Are you sure you want to unvote:
          <StyledModalHeader>{name}?</StyledModalHeader>
        </ModalHeader>
        <ModalBody>
          You are no longer gonna spread love to this guest.
        </ModalBody>

        <ModalFooter alignItems="center" m="16px 0 0 0">
          <CloseModal onClick={onClose}>Close</CloseModal>

          <CustomButton
            appearance="secondary"
            margin="0 0 0 24px"
            onClick={() => handleUnVote(id, podcastId)}
          >
            Yes, revert my vote
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
