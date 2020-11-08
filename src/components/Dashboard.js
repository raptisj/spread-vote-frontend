import React, { useEffect } from "react";
import { Grid,  Tooltip } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";

// redux
import { authSelector, currentUser } from "../redux/slices/auth";
import { unVoteGuest } from "../redux/slices/guests";

// ui
import DashboardCard from "../ui/DashboardCard";
import GoBack from "../ui/GoBack";
import GlobalSpinner from "../ui/GlobalSpinner";
import EmptyDashboard from "../screens/EmptyDashboard";
import Layout from "../screens/Layout";
import { Link, useParams } from "react-router-dom";
import { getAllPodcasts, selectAllPodcasts } from "../redux/slices/podcasts";

const Header = styled.header`
  h2 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  p {
    color: ${(props) => props.theme.colors.black.soft};
  }
`;

const Rows = styled.div`
  padding: 48px 0 0 0;

  & > a > h3, & > h3 {
    font-size: 30px;
    color: ${(props) => props.theme.colors.black.soft};
    display: inline-block;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { podId } = useParams();

  const { user, loading } = useSelector(authSelector);
  const podcasts = useSelector(selectAllPodcasts);
  const podcastsLoader = useSelector(state => state.podcasts.loading);
  const {entities} = useSelector(state => state.podcasts)

  const normalizeBy = key => {
    return (data, item) => {
      data[item[key]] = item
      return data
    }
  }

  const normalizedGuests = podcasts
  .map(pod => pod.guests)
  .flat()
  .reduce(normalizeBy("_id"), {})
  
  const guestsId = podcasts
  .map(pod => pod.guests)
  .flat()
  .map(guest => guest._id)
  
  useEffect(() => {
    dispatch(getAllPodcasts());
    dispatch(currentUser());
  }, [dispatch, podId]);

  const handleUnVote = (guestId, podcastId) => {
    let userData = {
      votes: [user._id],
      podcastId,
    };

    dispatch(unVoteGuest(userData, guestId, podId));
  };

  if (loading || user === null || podcastsLoader || podcasts === null)
    return <GlobalSpinner />;

  const filteredGuests = guestsId.filter(p => normalizedGuests[p].votes.includes(user._id))
  const userGuests = filteredGuests.map(p => normalizedGuests[p])

  let podcastIds = [...new Set(userGuests.map(p =>  p.podcast_id))]
  
  if (podcastIds.length === 0) return <EmptyDashboard />;

  return (
    <Layout>
      <GoBack path={`/podcasts/${podId}`} />

      <Header>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>List of all the guests you have voted.</p>
      </Header>

      {podcasts.length > 0 &&
        podcastIds.map((podcastId, i) => (
            <Rows key={i}>
            {entities[podcastId]._id !== podId ? (
              <Tooltip hasArrow label={`Go to ${entities[podcastId].name}`} placement="top" p="8px" bg="#717277">
                <Link to={`/podcasts/${entities[podcastId]._id}/`}>
                  <h3>{entities[podcastId].name}</h3>
                </Link>
              </Tooltip>
            ) : <h3>{entities[podcastId].name}</h3>}
              <Grid templateColumns="repeat(3, 1fr)" gap="16px" mt="32px">
                {userGuests.length > 0 &&
                  userGuests
                    .filter((p) => p.podcast_name === entities[podcastId].name)
                    .map((guest, i) => (
                      <DashboardCard
                        key={i}
                        guest={guest}
                        loading={loading}
                        handleUnVote={handleUnVote}
                      />
                    ))}
              </Grid>
            </Rows>
          ))}
    </Layout>
  );


//   return (
//     <Layout>
//       <GoBack path={`/podcasts/${podId}`} />

//       <Header>
//         <h2>
//           {user.firstName} {user.lastName}
//         </h2>
//         <p>List of all the guests you have voted.</p>
//       </Header>

//       {podcasts.length > 0 &&
//         podcasts
//           .filter(
//             (podcast) =>
//               podcast.guests.length > 0 ||
//               !podcast.guests.map((p) => p.votes.includes(user._id))
//           )
//           .map((podcast, i) => (
//             <Rows key={i}>
//               <h3>{podcast.name}</h3>
//               <Grid templateColumns="repeat(3, 1fr)" gap="16px" mt="32px">
//                 {podcast.guests.length > 0 &&
//                   podcast.guests
//                     .filter((p) => p.votes.includes(user._id))
//                     .map((guest, i) => (
//                       <DashboardCard
//                         key={i}
//                         guest={guest}
//                         loading={loading}
//                         handleUnVote={handleUnVote}
//                       />
//                     ))}
//               </Grid>
//             </Rows>
//           ))}
//     </Layout>
//   );
};

export default Dashboard;
