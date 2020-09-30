import React from "react";
import {
  Box,
  // Grid,
  Button,
  Input,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  FormHelperText,
  RadioButtonGroup,
  // RadioGroup,
  // Radio,
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import CustomButton from "../ui/Button";
import LinkButton from "../ui/LinkButton";

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e6e6;
  margin: 2rem 0;
`;

const Radios = styled.div`
  margin-top: 48px;

  legend {
    margin-bottom: 8px;
  }
`;

const MainInput = styled(Input)`
  border: 1px solid #e6e6e6;
`;

const ButtonRadios = styled(RadioButtonGroup)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
`;

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "red" : "gray"}
      aria-checked={isChecked}
      role="radio"
      height="30px"
      fontSize="14px"
      isDisabled={isDisabled}
      cursor="pointer"
      border="none"
      {...rest}
    />
  );
});

const VotingForm = () => {
  // const [value, setValue] = React.useState("Comedy");

  return (
    <Box p="32px" margin="0 auto" maxWidth="1280px">
      <h2>Voting Form</h2>
      <FormControl maxWidth="700px" m="32px 0">
        <FormLabel htmlFor="name" pb="8px">
          Search for Guest
        </FormLabel>
        <MainInput
          type="text"
          id="name"
          aria-describedby="guest-name"
          boxSizing="border-box"
        />

        <FormHelperText id="guest-name">
          Search either by name or twitter name.
        </FormHelperText>

        <Divider />

        <FormHelperText id="guest-name">
          Didn't find the guest you were looking for?
        </FormHelperText>

        <FormHelperText id="guest-name">
          <LinkButton to="/add-guest"> Create new Guest</LinkButton>
        </FormHelperText>

        <Radios>
          <FormLabel as="legend" pb="8px">
            Choose Category
          </FormLabel>
          {/* <RadioGroup
            defaultValue="Comedy"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            <Radio value="Comedy">Comedy</Radio>
            <Radio value="Politics">Politics</Radio>
            <Radio value="Art">Art</Radio>
            <Radio value="Conspiracy">Conspiracy</Radio>
          </RadioGroup> */}

          <ButtonRadios
            defaultValue="Comedy"
            onChange={(val) => console.log(val)}
          >
            <CustomRadio value="Comedy">Comedy</CustomRadio>
            <CustomRadio value="Politics">Politics</CustomRadio>
            <CustomRadio value="Science">Science</CustomRadio>
            <CustomRadio value="Conspiracy">Conspiracy</CustomRadio>
          </ButtonRadios>
        </Radios>

        <Divider />

        <FormHelperText id="guest-name">
          <CustomButton appearance="primary" type="submit">
            Vote
          </CustomButton>
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default VotingForm;
