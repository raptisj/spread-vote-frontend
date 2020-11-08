import { 
  createSlice, 
  createAsyncThunk,
  createEntityAdapter
 } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig } from './auth'

let url = "http://localhost:4000";


export const usersAdapter = createEntityAdapter({
  selectId: (podcast) => podcast._id,
});

const initialState = usersAdapter.getInitialState({ loading: false, hasErrors: false });

const userAPI = {
  async fetchAll() {
    const res = await axios.get(`${url}/podcasts/`);
    return res
  },
  async fetchOne(id) {
    const res = await axios.get(`${url}/podcasts/${id}`);
    return res
  },
};

export const getAllPodcasts = createAsyncThunk("podcast/fetchAll", async () => {
  const response = await userAPI.fetchAll();
  return response.data;
});


export const getSinglePodcast = createAsyncThunk("podcast/fetchOne", async (id) => {
  const response = await userAPI.fetchOne(id);
  return response.data;
});



const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    loadPodcasts: (state) => {
      state.loading = true;
    },

    categoryVoteSuccess: (state) => {
      state.loading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllPodcasts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPodcasts.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(getSinglePodcast.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSinglePodcast.fulfilled, (state, action) => {
      usersAdapter.upsertOne(state, action.payload);
      state.loading = false;
    });
  }
});

export const {
  loadPodcasts,
  categoryVoteSuccess,
  getAllPodcastsSuccess,
  getSinglePodcastsSuccess,
  podcastsFailure,
} = podcastsSlice.actions;

export default podcastsSlice.reducer;

export const {
  selectById: selectPodcastById,
  selectIds: selectPodcastIds,
  selectEntities: selectPodcastsEntities,
  selectAll: selectAllPodcasts,
  selectTotal: selectTotalPodcasts
} = usersAdapter.getSelectors(state => state.podcasts);


/**
 *
 *  VOTE FOR CATEGORY
 */
export const categoryVote = (userData, podId) => async (
  dispatch,
  getState
) => {
  dispatch(loadPodcasts());

  let apiUrl = `${url}/podcasts/${podId}/vote-category`;

  try {
    await axios.patch(apiUrl, userData, tokenConfig(getState));

    dispatch(categoryVoteSuccess())
    window.location.replace(`/podcasts/${podId}/`);
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(podcastsFailure());
      } else {
        dispatch(podcastsFailure());
      }
    }
  }
};


/**
 *
 *  GET ALL PODCASTS
 */
// export const getAllPodcasts = () => async (dispatch) => {
//   dispatch(loadPodcasts());

//   let apiUrl = `${url}/podcasts/`;

//   try {
//     const res = await axios.get(apiUrl);

//     dispatch(getAllPodcastsSuccess(res.data));
//   } catch (error) {
//     if (error) {
//       if (error.response.status === 400) {
//         dispatch(podcastsFailure());
//       } else {
//         dispatch(podcastsFailure());
//       }
//     }
//   }
// };

/**
 *
 *  GET SINGLE PODCAST
 */
// export const getSinglePodcast = (id) => async (dispatch) => {
//   dispatch(loadPodcasts());

//   let apiUrl = `${url}/podcasts/${id}`;

//   try {
//     const res = await axios.get(apiUrl);

//     dispatch(getSinglePodcastsSuccess(res.data));
//   } catch (error) {
//     if (error) {
//       if (error.response.status === 400) {
//         dispatch(podcastsFailure());
//       } else {
//         dispatch(podcastsFailure());
//       }
//     }
//   }
// };

/**
 *
//  *  UPDATE PODCAST
//  */
// export const updatePodcast = (id, newVotes) => async (dispatch, getState) => {
//   dispatch(loadPodcasts());

//   let apiUrl = `${url}/podcasts/${id}`;

//   try {
//     const res = await axios.patch(apiUrl, newVotes, tokenConfig(getState));

//     dispatch(updatePodcastsSuccess(res.data));
//   } catch (error) {
//     if (error) {
//       if (error.response.status === 400) {
//         dispatch(podcastsFailure());
//       } else {
//         dispatch(podcastsFailure());
//       }
//     }
//   }
// };
