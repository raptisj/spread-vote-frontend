import { 
  createSlice, 
  createAsyncThunk,
  createEntityAdapter
 } from "@reduxjs/toolkit";
// import axios from "axios";
// import { tokenConfig } from './auth'
import { emptySingleGuest } from './guests'
import { podcastAPI } from '../api/podcasts'
import { getAllGuests } from './guests';

export const podcastAdapter = createEntityAdapter({
  selectId: (podcast) => podcast._id,
});

const initialState = podcastAdapter.getInitialState({ 
  loading: false, 
  actionLoader: false, 
  hasErrors: false, 
  routeRedirect: null, 
  showToast: null, 
  guests: [],
});

export const getAllPodcasts = createAsyncThunk("podcast/fetchAll", async () => {
  const response = await podcastAPI.fetchAll();
  return response.data;
});

export const getSinglePodcast = createAsyncThunk("podcast/fetchOne", async (id, {dispatch}) => {
  const response = await podcastAPI.fetchOne(id);
  const { _id } = response.data.podcast

  dispatch(getAllGuests(_id))
  dispatch(emptySingleGuest())

  return response.data;
});

export const categoryVote = createAsyncThunk("podcast/voteOne", async (data, {getState}) => {
  const {userData, podId} = data
  const response = await podcastAPI.voteOne(userData, podId, getState);
  
  return response;
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
      podcastAdapter.setAll(state, action.payload);
      state.loading = false;
      state.routeRedirect = null
    });
    builder.addCase(getSinglePodcast.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSinglePodcast.fulfilled, (state, action) => {
      podcastAdapter.upsertOne(state, action.payload.podcast);
      state.loading = false;
      state.routeRedirect = null
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
} = podcastAdapter.getSelectors(state => state.podcasts);
