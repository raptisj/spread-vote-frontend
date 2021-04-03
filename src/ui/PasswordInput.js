import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import EyeClosed from "../icons/EyeClosed";
import EyeOpen from "../icons/EyeOpen";
import styled from "@emotion/styled";

const HideShow = styled.span`
  height: 2.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PasswordInput = ({ onChange }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        id="password"
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <HideShow onClick={handleClick}>
          {show ? (
            <EyeClosed width={26} height={26} />
          ) : (
            <EyeOpen width={26} height={26} />
          )}
        </HideShow>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
