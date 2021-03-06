import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// base url
let url = "http://localhost:4000";

export const initialState = {
  loading: false,
  hasErrors: false,
  token: window.localStorage.getItem("token"),
  isAuthenticated: JSON.parse(window.localStorage.getItem("auth")),
  user: null,
  userId : window.localStorage.getItem("userId"),
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadReport: (state) => {
      state.loading = true;
    },

    signUpSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.token = window.localStorage.setItem("token", payload.token);
      state.isAuthenticated = window.localStorage.setItem("auth", true);
      state.userId = window.localStorage.setItem("userId", payload.id);
    },
    
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.token = window.localStorage.setItem("token", payload.token);
      state.isAuthenticated = JSON.stringify(
        window.localStorage.setItem("auth", true)
        );
      state.userId = window.localStorage.setItem("userId", payload.id);  
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
      state.isAuthenticated = window.localStorage.setItem("auth", false);
      state.userId = window.localStorage.setItem("userId", null);
    },

    currentSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
    },

    updateUser: (state, { payload }) => {
      state.user = payload
    },

    updateGuestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = { ...state.user, guests: state.user.guests.push(payload) };
    },

    removeGuestsSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = {
        ...state.user,
        guests: state.user.guests.filter((p) => p._id !== payload),
      };
    },

    reportFailure: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errors = payload;
    },

    resetErrors: (state) => {
      state.errors = ''
    }
  },
});

export const {
  loadReport,
  signUpSuccess,
  loginSuccess,
  logoutSuccess,
  currentSuccess,
  updateUser,
  updateGuestsSuccess,
  removeGuestsSuccess,
  reportFailure,
  resetErrors
} = authSlice.actions;

export const authSelector = (state) => state.auth;
export default authSlice.reducer;

/**
 *
 *  CREATE USER
 */
export const signUp = (userData, customPath) => async (dispatch) => {
  dispatch(loadReport());

  let apiUrl = `${url}/signup/`;

  try {
    const res = await axios.post(apiUrl, userData);

    console.log(res.data)
    dispatch(signUpSuccess(res.data));

    window.location.replace(customPath);
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(reportFailure(error.response.data));
      } else {
        dispatch(reportFailure());
        // window.location.replace("/add-guest");
      }
    }
  }
};

/**
 *
 *  LOGIN USER
 */
export const login = (userData, customPath) => async (dispatch) => {
  dispatch(loadReport());

  let apiUrl = `${url}/login/`;

  try {
    const res = await axios.post(apiUrl, userData);
    dispatch(loginSuccess(res.data));

    window.location.replace(customPath);
  } catch (error) {
    if (error) {
      if (error.response.status === 400) {
        dispatch(reportFailure(error.response.data));
      } else {
        dispatch(reportFailure());
        // window.location.replace("/add-guest");
      }
    }
  }
};

/**
 *
 * LOGOUT
 */
export const logout = () => (dispatch) => {
  window.localStorage.removeItem("token");
  window.location.replace("/auth/login/");
console.log('hell')
  dispatch(logoutSuccess());
};

/**
 *
 * CHECK CURRENT USER
 */
export const currentUser = () => async (dispatch, getState) => {
  dispatch(loadReport());

  let apiUrl = `${url}/user/`;

  try {
    const res = await axios.get(apiUrl, tokenConfig(getState));

    dispatch(currentSuccess(res.data));
  } catch (error) {
    if (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        // window.location.replace("/auth/login");
      } else {
        dispatch(reportFailure());
        window.location.replace("/");
      }
    }
  }
};

/**
 *
 * UPDATE GUESTS
 */
// export const updateGuests = (votesData) => async (dispatch, getState) => {
//   let apiUrl = `${url}/user/guest/add/`;

//   try {
//     const res = await axios.patch(apiUrl, votesData, tokenConfig(getState));
//     console.log(res.data);
//     dispatch(updateGuestsSuccess(res.data));
//   } catch (error) {
//     if (error) {
//       if (error.response.status === 400) {
//         dispatch(reportFailure());
//       } else {
//         dispatch(reportFailure());
//       }
//     }
//   }
// };

/**
 *
 *  REMOVE GUEST FROM USER
 */
// export const removeGuestsFromUser = (votesData) => async (
//   dispatch,
//   getState
// ) => {
//   let apiUrl = `${url}/user/guest/remove/`;

//   try {
//     const res = await axios.patch(apiUrl, votesData, tokenConfig(getState));

//     dispatch(removeGuestsSuccess(res.data._id));
//   } catch (error) {
//     if (error) {
//       // console.log(error);
//       if (error.response.status === 400) {
//         dispatch(reportFailure());
//       } else {
//         dispatch(reportFailure());
//       }
//     }
//   }
// };

/**
 *
 * GET TOKEN TO CHECK CURRENT USER
 */
export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["token"] = token;
  }

  return config;
};
