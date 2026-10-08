import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/authActions";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;