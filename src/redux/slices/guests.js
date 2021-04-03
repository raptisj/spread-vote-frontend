import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig, updateUser, logout } from "./auth";
import { URL } from '../../constants';

let url = "http://localhost:4000";

export const guestAdapter = createEntityAdapter({
  selectId: (guest) => guest._id,
});

const initialState = guestAdapter.getInitialState({ 
  loading: false,
  hasErrors: false,
  singleGuest: null,
  podcastsInGuest: null,
});

export const guestAPI = {
  async fetchAll() {
    const res = await axios.get(`${URL}/guests`);
    return res
  },
  async updateGuest(userData, getState) {
    const res = await axios.patch(`${URL}/guests/${userData._id}`, userData, tokenConfig(getState));
    return res
  },
  // async fetchUserGuest(guestId, getState) {
  //   const res = await axios.get(`${URL}/user/${guestId}`, tokenConfig(getState));
  //   return res
  // },
};

export const getAllGuests = createAsyncThunk("guest/fetchAll", async () => {
  const response = await guestAPI.fetchAll();
  return response.data;
});

export const updateUserGuest = createAsyncThunk("guest/updateGuest", async (userData, { dispatch, getState }) => {
  const response = await guestAPI.updateGuest(userData, getState);

  dispatch(updateUser(response.data.user))

  return response.data;
});

// export const getSingleGuest = createAsyncThunk("guest/fetchUserGuests", async (guestId, { getState }) => {
//   const response = await guestAPI.fetchUserGuest(guestId, getState);
//   return response.data;
// });

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
      guestAdapter.setAll(state, payload);
      state.singleGuest = payload.singleGuest;
      state.podcastsInGuest = payload.guestInPodcasts;
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

    createGuestSuccess: (state) => {
      state.loading = false;
      state.twitterData = null;
    },

    guestsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.twitterData = null;
    },

    emptySingleGuest: (state) => {
      state.singleGuest = null; 
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllGuests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllGuests.fulfilled, (state, action) => {
      guestAdapter.upsertMany(state, action.payload);
      state.loading = false;
      state.routeRedirect = null
    });
    builder.addCase(updateUserGuest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserGuest.fulfilled, (state, action) => {
      guestAdapter.upsertOne(state, action.payload.guest);
      state.loading = false;

      state.routeRedirect = null
    });
    // builder.addCase(currentUserGuests.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(currentUserGuests.fulfilled, (state, action) => {
    //   guestAdapter.setAll(state, action.payload);
    //   state.loading = false;
    //   state.routeRedirect = null
    // });
  }
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
// export const publishedGuestsSelector = (state) => state.guests.Object..filter(p => p.state !== 'hidden');
export default guestsSlice.reducer;

export const {
  selectById: selectGuestById,
  selectIds: selectGuestIds,
  selectEntities: selectGuestsEntities,
  selectAll: selectAllGuests,
  selectTotal: selectTotalGuests
} = guestAdapter.getSelectors(state => state.guests);

/**
 *
 *  GET ALL GUESTS
 */
// export const getAllGuests = (podId) => async (dispatch, getState) => {
//   dispatch(loadGuests());

//   let apiUrl = `${URL}/Guests/${podId}/guests`;

//   try {
//     const res = await axios.get(apiUrl);

//     dispatch(getAllGuestsSuccess(res.data));
//   } catch (error) {
//     if (error) {
//       if (error.response.status === 400) {
//         dispatch(guestsFailure());
//       } else {
//         dispatch(guestsFailure());
//       }
//     }
//   }
// };

/**
 *
 *  GET SINGLE GUESTS
 */
export const getSingleGuest = (id) => async (dispatch) => {
  dispatch(loadGuests());

  let apiUrl = `${URL}/guests/${id}`;

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

  let apiUrl = `${URL}/guests/up-vote/${id}`;

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
export const unVoteGuest = (userData, id, podId) => async (
  dispatch,
  getState
) => {
  dispatch(loadGuests());

  let apiUrl = `${URL}/guests/un-vote/${id}`;

  try {
    await axios.patch(apiUrl, userData, tokenConfig(getState));

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
