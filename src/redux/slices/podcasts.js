import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = "http://localhost:4000";

export const initialState = {
  loading: false,
  hasErrors: false,
  podcasts: null,
  singlePodcast: null,
};

const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    loadPodcasts: (state) => {
      state.loading = true;
    },

    getAllPodcastsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.podcasts = payload;
    },

    getSinglePodcastsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.singlePodcast = payload;
    },

    podcastsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  loadPodcasts,
  getAllPodcastsSuccess,
  getSinglePodcastsSuccess,
  podcastsFailure,
} = podcastsSlice.actions;

export const podcastsSelector = (state) => state.podcasts;
export default podcastsSlice.reducer;

/**
 *
 *  GET ALL PODCASTS
 */
export const getAllPodcasts = () => async (dispatch) => {
  dispatch(loadPodcasts());

  let apiUrl = `${url}/podcasts/`;

  try {
    const res = await axios.get(apiUrl);

    dispatch(getAllPodcastsSuccess(res.data));
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
 *  GET SINGLE PODCAST
 */
export const getSinglePodcast = (id) => async (dispatch) => {
  dispatch(loadPodcasts());

  let apiUrl = `${url}/podcasts/${id}`;

  try {
    const res = await axios.get(apiUrl);

    dispatch(getSinglePodcastsSuccess(res.data));
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