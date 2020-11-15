import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioButtonGroup,
  useToast
} from "@chakra-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, currentUser } from "../redux/slices/auth";
import { selectPodcastById, getSinglePodcast, categoryVote } from '../redux/slices/podcasts'
import styled from "@emotion/styled";
import CustomButton from "../ui/Button";
import { isEmpty } from "../utils/helperFunctions";
import GlobalSpinner from "../ui/GlobalSpinner";
import Toasts from "../ui/Toasts";
import GoBack from '../ui/GoBack'

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


const ButtonRadios = styled(RadioButtonGroup)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;

  span {
    background: #19c39c;
    position: absolute;
    top: -26px;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    right: 10px;
    color: #fff;
    display: none;
  }

  button:focus {
    box-shadow: none;
  }


  button:hover,
  button:focus,
  button[aria-checked="true"] {
    span {
      display: flex;
    }
  }
`;


const Message = styled.h2`
  margin-top: 16px;


  span {
    color: ${(props) => props.theme.colors.green.brand};
  } 
`

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
  const dispatch = useDispatch();
  const { podId } = useParams();
  const [currentCategory, setCurrentCategories] = useState("");
  const { isAuthenticated, user } = useSelector(authSelector);
  const singlePodcast = useSelector((state) => selectPodcastById(state, podId))
  const podcastLoading = useSelector(state => state.podcasts.loading);
  const routeRedirect = useSelector(state => state.podcasts.routeRedirect);
  // const hasErrors = useSelector(state => state.podcasts.hasErrors);
  const actionLoader = useSelector(state => state.podcasts.actionLoader);
  const history = useHistory();
  // const toast = useToast();
  // const [err, setErr] = useState(hasErrors)

  // useEffect(() => {
  //   hasErrors && toast({
  //     title: "Warning.",
  //     description: "This is a warning.",
  //     status: "warning",
  //     duration: 9000,
  //     isClosable: true,
  //   })
  //   setErr(false)
  // },[hasErrors, toast, err])

// console.log(err)
//   console.log(hasErrors)
  useEffect(() => {
    dispatch(getSinglePodcast(podId));
    routeRedirect !== null && history.push(routeRedirect)
    
    if (isAuthenticated) {
      dispatch(currentUser());
    }
  }, [dispatch, isAuthenticated, podId, routeRedirect, history]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      userId: user._id,
      currentCategory,
    };

    dispatch(categoryVote({userData, podId}));
  };

  
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
  if (podcastLoading || isEmpty(singlePodcast) || routeRedirect !== null || user === null)
  return <GlobalSpinner />;

  const { category, name } = singlePodcast
  


//   const array = [2, 5, 9];

// const findId = (data, id) => {
//   const index = data.indexOf(id);
//   if (index > -1) {
//     data.splice(index, 1);
//     return data
//   }
// }

// // array = [2, 9]
// console.log(findId(array, 5));


  return (
    <Box p="32px" margin="0 auto" maxWidth="1280px">
      <GoBack path={`/podcasts/${podId}`} />

      <h2>Choose Category</h2>

      <form onSubmit={handleSubmit}>
        <FormControl maxWidth="700px" m="32px 0">
          <Radios>
            <FormLabel as="legend" pb="8px">
              Vote for what type of podcasts you want to see.
            </FormLabel>

            <ButtonRadios
              defaultValue={user.category}
              onChange={(val) => setCurrentCategories(val)}
            >
            {category.map((each, i) => (
              <CustomRadio value={each.id} key={i}>{capitalize(each.label)}<span>{each.value}</span></CustomRadio>
            ))}
            </ButtonRadios>
          </Radios>

         {/* <Toasts hasErrors={hasErrors} /> */}
          {user.category !== null && <Message>Currently you want more <span>{user.category}</span> from <span>{name}</span></Message>} 
          
          <Divider />

          <FormHelperText id="guest-name">
            <CustomButton appearance="primary" isLoading={actionLoader} type="submit" disabled={currentCategory === '' || currentCategory === user.category}>
              Vote
            </CustomButton>
          </FormHelperText>
        </FormControl>
      </form>
    </Box>
  );
};

export default VotingForm;
