import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig, updateGuests, removeGuestsFromUser } from "./auth";

let url = "http://localhost:4000";

export const initialState = {
  loading: false,
  scrapeLoader: false,
  hasErrors: false,
  guests: [],
  singleGuest: null,
  twitterData: null,
};

const guestsSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {
    loadGuests: (state) => {
      state.loading = true;
    },

    loadScraper: (state) => {
      state.scrapeLoader = true;
    },

    getAllGuestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.guests = payload;
      state.singleGuest = null;
    },

    getSingleGuestSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleGuest = payload;
    },

    voteGuestSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleGuest = { ...state.singleGuest, votes: payload };
    },

    unVoteGuestSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleGuest = { ...state.singleGuest, votes: payload };
    },

    preFetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.scrapeLoader = false;
      state.twitterData = payload;
    },

    createGuestSuccess: (state, { payload }) => {
      state.loading = false;
      state.twitterData = null;
    },

    guestsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  loadGuests,
  loadScraper,
  getAllGuestsSuccess,
  getSingleGuestSuccess,
  voteGuestSuccess,
  unVoteGuestSuccess,
  preFetchSuccess,
  createGuestSuccess,
  guestsFailure,
} = guestsSlice.actions;

export const guestsSelector = (state) => state.guests;
export default guestsSlice.reducer;

/**
 *
 *  GET ALL GUESTS
 */
export const getAllGuests = () => async (dispatch) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/`;

  try {
    const res = await axios.get(apiUrl);

    dispatch(getAllGuestsSuccess(res.data));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};

/**
 *
 *  GET ALL GUESTS
 */
export const getTrendingGuests = () => async (dispatch) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/?trending=true`;

  try {
    const res = await axios.get(apiUrl);

    dispatch(getAllGuestsSuccess(res.data));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};

/**
 *
 *  GET SINGLE GUESTS
 */
export const getSingleGuest = (id) => async (dispatch) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/${id}`;

  try {
    const res = await axios.get(apiUrl);

    dispatch(getSingleGuestSuccess(res.data));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};

/**
 *
 *  VOTE GUEST
 */
export const upVoteGuest = (userId, id) => async (dispatch, getState) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/up-vote/${id}`;

  try {
    const res = await axios.patch(apiUrl, userId, tokenConfig(getState));

    dispatch(voteGuestSuccess(res.data.votes));
    dispatch(updateGuests(res.data));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};

/**
 *
 *  UN VOTE GUESTS
 */
export const unVoteGuest = (userId, id) => async (dispatch, getState) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/un-vote/${id}`;

  try {
    const res = await axios.patch(apiUrl, userId, tokenConfig(getState));

    dispatch(unVoteGuestSuccess(res.data.votes));
    dispatch(removeGuestsFromUser(res.data));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};

/**
 *
 *  PRE FETCH GUEST
 */
export const preFetchGuest = (twitterName) => async (dispatch, getState) => {
  dispatch(loadScraper());

  let apiUrl = `${url}/guests/create/fetch`;

  try {
    const res = await axios.post(apiUrl, twitterName, tokenConfig(getState));

    dispatch(preFetchSuccess(res.data));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};

/**
 *
 *  CREATE GUEST
 */
export const createGuest = (twitterData) => async (dispatch, getState) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/create`;

  try {
    const res = await axios.post(apiUrl, twitterData, tokenConfig(getState));

    dispatch(createGuestSuccess(res.data));
    dispatch(updateGuests(res.data));
    window.location.replace("/guests");
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else {
        dispatch(guestsFailure());
      }
    }
  }
};
