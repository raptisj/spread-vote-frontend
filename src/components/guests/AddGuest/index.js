// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Input,
//   FormControl,
//   FormLabel,
//   FormHelperText,
//   Image,
// } from "@chakra-ui/react";
// import styled from "@emotion/styled";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   preFetchGuest,
//   createGuest,
//   getAllGuests,
//   guestsSelector,
// } from "../../../redux/slices/guests";
// import { currentUser } from "../../../redux/slices/auth";
// import { getSinglePodcast, selectPodcastById } from "../../../redux/slices/podcasts";
// import { authSelector } from "../../../redux/slices/auth";
// import { isEmpty } from "../../../utils/helperFunctions";
// import GlobalSpinner from "../../../ui/GlobalSpinner";
// import FullWidthCard from "../../../ui/FullWidthCard";
// import SmallSpinner from "../../../ui/SmallSpinner";
// import CustomButton from "../../../ui/Button";
// import Warning from "../../../icons/Warning";
// import Layout from "../../../screens/Layout";
// import theme from "../../../theme";
// import Header from "../../../ui/Header";

// const Divider = styled.div`
//   height: 1px;
//   width: 100%;
//   background: #e6e6e6;
//   margin: 2rem 0;
// `;

// const MainInput = styled(Input)`
//   border: 1px solid #e6e6e6;
// `;

// const WarningMessage = styled.span`
//   display: flex;
//   align-items: center;
//   margin-bottom: 8px;
// `;

// const ImageBox = styled.div`
//   margin-top: 24px;
//   display: inline-block;
//   background: #19c39c20;
//   padding: 16px;
//   border-radius: 4px;

//   h3 {
//     // color: ${(props) => props.theme.colors.black.dark};
//   }

//   span {
//     display: block;
//     // color: ${(props) => props.theme.colors.black.soft};
//   }
//   p {
//     margin-top: 16px;
//     padding: 16px;
//     white-space: break-spaces;
//   }
// `;

// const GuestExistsMsg = styled.p`
//   margin: 16px 0;
//   // color: ${(props) => props.theme.colors.green.brand};
//   font-size: 20px;
// `;

// const ScrapeLoader = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin: 24px 0;

//   p {
//     margin-top: 1rem;
//   }
// `;

// const Body = styled.div`
//   padding: 32px 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   & > div {
//     width: 100%;
//   }
// `;

// // @jdnoc

// //  @anthilemoon

// // @banditaras

// // @JohnRaptisM

// // @swyx

// // @levelsio 

// //  @taniarascia

// const AddGuest = () => {
//   const dispatch = useDispatch();
//   const { podId } = useParams();
//   const { twitterData, loading, scrapeLoader, hasErrors } = useSelector(guestsSelector);
//   const { isAuthenticated, user } = useSelector(authSelector);
//   const singlePodcast = useSelector((state) => selectPodcastById(state, podId))
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     // dispatch(getAllGuests(podId));
//     // dispatch(getSinglePodcast(podId));

//     if (isAuthenticated) {
//       dispatch(currentUser());
//     }
//   }, [dispatch, isAuthenticated, podId]);

//   useEffect(() => {
//     if (hasErrors) return setInputValue('');
//   }, [hasErrors])

//   const handlePaste = (e) => {
//     let name = e.clipboardData.getData("Text").replace(/[@]/, "");
//     setInputValue(name);

//     const data = {
//       name,
//     };
//     dispatch(preFetchGuest(data, podId));
//   };

//   const handleChange = (e) => {
//     let keycode = e.keyCode ? e.keyCode : e.which;
//     if (keycode === 8) {
//       setInputValue("");
//     } else {
//       setInputValue((inputValue) => inputValue);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       twitter_image: twitterData.twitter_image,
//       name: twitterData.name,
//       twitter_name: twitterData.twitter_name,
//       bio: twitterData.bio,
//       podcasts: [{
// 				id: podId,
// 				name: singlePodcast.name,
// 				votes: [user._id]
// 			}],
//     };

//     dispatch(createGuest(data, podId));
//   };

//   if (loading || user === null || singlePodcast === null)
//   return <GlobalSpinner />;
  
//   console.log(singlePodcast)
//   const guestAlreadyExists = twitterData !== null && singlePodcast.guests.find(p => p.twitter_name === twitterData.twitter_name)

//   return (
//     <Layout>
//       <Header heading="Add Guest" />
//       <form onSubmit={handleSubmit}>
//         <FormControl maxWidth="700px" m="32px 0">
//           <FormLabel htmlFor="name" pb="8px">
//             Guest's Twitter name
//           </FormLabel>
//           <MainInput
//             type="text"
//             id="name"
//             aria-describedby="guest-name"
//             boxSizing="border-box"
//             onPaste={(e) => handlePaste(e)}
//             onKeyDown={(e) => handleChange(e)}
//             onChange={(e) => setInputValue(inputValue)}
//             value={inputValue}
//           />
//           <FormHelperText id="guest-name">
//             <WarningMessage>
//               <Warning
//                 stroke={theme.colors.red.customRed}
//                 width={20}
//                 height={20}
//               />
//               Paste guest's Twitter name. Typing won't work.
//             </WarningMessage>
//             <WarningMessage>
//               <Warning
//                 stroke={theme.colors.red.customRed}
//                 width={20}
//                 height={20}
//               />
//               Guest should have at least 5 votes in order to be visible.
//             </WarningMessage>
//           </FormHelperText>

//           <Body>
//             <div>
//               {twitterData !== null && guestAlreadyExists && (
//                 <React.Fragment>
//                   <GuestExistsMsg>
//                     {twitterData.votes.includes(user._id)
//                       ? "You have already voted for this guest."
//                       : "This guest already exits. Go and vote."}
//                   </GuestExistsMsg>

//                   <Link to={`/podcasts/${podId}/guests/${twitterData._id}`}>
//                     <FullWidthCard
//                       card={twitterData}
//                       hasVoted={
//                         user ? twitterData.votes.includes(user._id) : null
//                       }
//                     />
//                   </Link>
//                 </React.Fragment>
//               )}  
//               {twitterData !== null && !isEmpty(twitterData) && !hasErrors && !guestAlreadyExists && (
//                 <ImageBox>
//                   <Image
//                     rounded="9999px"
//                     size="150px"
//                     src={twitterData.twitter_image}
//                     alt={twitterData.name}
//                     display="block"
//                     p="16px"
//                     objectFit="cover"
//                   />
//                   <h3>{twitterData.name}</h3>
//                   <span>{twitterData.twitter_name}</span>
//                   <p>{twitterData.bio}</p>
//                 </ImageBox>
//               )}

//               {hasErrors && (
//                 <div>Something went wrong</div>
//               )}
    
//               {isEmpty(twitterData) && twitterData !== null && (
//                 <div>Could not find guest</div>
//               )}

//               {scrapeLoader && (
//                 <ScrapeLoader>
//                   <SmallSpinner />
//                   <p>It might take a few seconds. . .</p>
//                 </ScrapeLoader>
//               )}
//             </div>
//           </Body>
//           <Divider />

//           <FormHelperText id="guest-name">
//             <CustomButton
//               appearance="primary"
//               type="submit"
//               disabled={isEmpty(twitterData) || twitterData === null || guestAlreadyExists || hasErrors}
//               isLoading={loading}
//             >
//               Submit
//             </CustomButton>
//           </FormHelperText>
//         </FormControl>
//       </form>
//     </Layout>
//   );
// };

// export default AddGuest;
