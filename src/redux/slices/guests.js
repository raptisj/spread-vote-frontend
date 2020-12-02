import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig, logout } from "./auth";

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
      state.twitterData = null;
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

    emptySingleGuest: (state) => {
      state.singleGuest = null; 
    }
  },
});

export const {
  loadGuests,
  loadScraper,
  getAllGuestsSuccess,
  getSingleGuestSuccess,
  voteGuestSuccess,
  preFetchSuccess,
  createGuestSuccess,
  guestsFailure,
  emptySingleGuest
} = guestsSlice.actions;

export const guestsSelector = (state) => state.guests;
export default guestsSlice.reducer;

/**
 *
 *  GET ALL GUESTS
 */
export const getAllGuests = (podId) => async (dispatch, getState) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/podcasts/${podId}/guests`;

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
export const getSingleGuest = (podId, id) => async (dispatch) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/podcasts/${podId}/guests/${id}`;

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
    let guestVotes = res.data.guests.filter((p) => p._id === id)[0].votes;

    dispatch(voteGuestSuccess(guestVotes));
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(guestsFailure());
      } else if (error.response.status === 401) {
        dispatch(logout())
        // window.location.reload();
        // window.history.pushState('/auth/login/')
        dispatch(guestsFailure());
        console.log('fuck')
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
export const unVoteGuest = (userId, id, podId) => async (
  dispatch,
  getState
) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/un-vote/${id}`;

  try {
    await axios.patch(apiUrl, userId, tokenConfig(getState));

    window.location.replace(`/podcasts/${podId}/dash`);
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
export const preFetchGuest = (twitterName, podId) => async (
  dispatch,
  getState
) => {
  dispatch(loadScraper());

  let apiUrl = `${url}/podcasts/${podId}/guests/create/fetch`;

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
export const createGuest = (twitterData, podId) => async (
  dispatch,
  getState
) => {
  dispatch(loadGuests());

  let apiUrl = `${url}/guests/create`;

  try {
    const res = await axios.post(apiUrl, twitterData, tokenConfig(getState));

    window.location.replace(`/podcasts/${podId}/guests`);
    dispatch(createGuestSuccess(res.data));
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
 *  FIND AND CREATE
 */
export const fetchUpdateTwitterData = (twitterName, podId) => async (
  dispatch,
  getState
) => {
  dispatch(loadScraper());

  let apiUrl = `${url}/podcasts/${podId}/guests/create/fetch`;

  try {
    const res = await axios.patch(apiUrl, twitterName, tokenConfig(getState));

    console.log(res.data)

    // dispatch(preFetchSuccess(res.data));
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
