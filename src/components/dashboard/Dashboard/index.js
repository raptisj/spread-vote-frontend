import React, { useEffect } from "react";
import { Grid, Text, Box, Avatar, Flex, Badge, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { authSelector, currentUser } from "redux/slices/auth";
import { unVoteGuest, currentUserGuests, getSingleGuest, selectAllGuests, selectGuestById, guestsSelector } from "redux/slices/guests";
import { getAllPodcasts, selectAllPodcasts } from "redux/slices/podcasts";
import DashboardCard from "ui/DashboardCard";
import GlobalSpinner from "ui/GlobalSpinner";
import Layout from "screens/Layout";
import Header from 'ui/Header';
import SvgTwitter from "icons/TwiterIcon";
import SvgWebsite from "icons/WebsiteIcon";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { podId } = useParams();

  const { user, userId, guestId, loading } = useSelector(authSelector);
  // const podcasts = useSelector(selectAllPodcasts);
  // const podcastsLoader = useSelector(state => state.podcasts.loading);
  // const userGuests = useSelector(state => selectAllGuests(state));
  const { singleGuest, loading: guestLoading } = useSelector(guestsSelector);
  // console.log(userId)

  useEffect(() => {
    dispatch(getAllPodcasts());
    dispatch(currentUser());
    dispatch(getSingleGuest(userId));
  }, [dispatch, podId, guestId, userId]);

  const handleUnVote = (guestId, podcastId) => {
    let userData = {
      votes: [user._id],
      podcastId,
      guestId,
      userId: user._id
    };

    dispatch(unVoteGuest(userData, guestId, podId));
  };

  if (loading || user === null || guestLoading || !singleGuest)
    return <GlobalSpinner />;

  const { name, bio, avatar, social } = singleGuest;
  const { podcastActive, profileActive } = user;

  const socialIcons = [<SvgWebsite />, <SvgTwitter />]
  const fonmalizedSocial = Object.keys(social)
    .map((p, i) => ({ name: p, url: social[p], icon: socialIcons[i] }))
    .filter(p => p.url !== "");


  const statusBadge = (status) => <Badge ml="1" colorScheme={status ? "green" : "red"}>{status ? "Visible" : "Not Visible"}</Badge>;
  // maybe this will be nneded later on
  // const so = {
  //   website: {
  //     url: "http"
  //   },
  //   twitter: {
  //     url: "httptttt"
  //   }
  // }
  // with so  
  // console.log(Object.keys(so).map((p,i) => ({ name: p, url: so[p].url, icon: socialIcons[i] })))

  return (
    <Layout>
      <Header heading="Dashboard" />

      <Box bg="#fff" p="1rem 1rem 2rem 1rem" display="inline-block" minW="600px" mt={6} borderRadius="4px">
        <Heading as="h3" size="lg" fontWeight="300">Personal Information</Heading>

        <Flex mt={6}>
          <Avatar src={avatar} />
          <Box ml="3" maxW="400px">
            <Text fontWeight="bold">
              {name}
            </Text>
            <Text fontSize="sm">{bio}</Text>
          </Box>

        </Flex>
        <Text mt={6}>Profile Status:
        {statusBadge(profileActive)}
        </Text>
        <Text mt={6}>Podcast Status:
        {statusBadge(podcastActive)}
        </Text>

        <hr style={{ margin: '1rem 0' }} />
        <Box display="flex" justifyContent="flex-end" style={{ gap: '6px' }}>
          {fonmalizedSocial.map(s => (
            <a key={s.name} href={s.url} title={s.name}>
              {s.icon}
            </a>
          ))}
        </Box>
      </Box>

      <Box p="1rem 1rem 2rem 1rem" display="inline-block" minW="600px" mt={6} borderRadius="4px">
        <Heading as="h3" size="lg" fontWeight="300">People Voted</Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap="16px" mt="32px">
          {/* {userGuests.length > 0 &&
            userGuests.map(guest => (
              <DashboardCard
                key={guest._id}
                guest={guest}
                loading={loading}
                handleUnVote={handleUnVote}
              />
            ))} */}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
