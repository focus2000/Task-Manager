import {
  AUTH_ERROR,
  CLEAR_ERROR,
  FAIL_LOGIN,
  FAIL_REGISTER,
  LOG_OUT,
  SET_ERROR,
  SET_USER,
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
} from "../constants";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userAuth: true,
        errors: null,
      };

    case SUCCESS_REGISTER:
    case SUCCESS_LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userAuth", true);
      localStorage.setItem("user",JSON.stringify(action.payload.user) );
      return {
        ...state,
        user: action.payload,
        userAuth: true,
        errors: null,
      };

    case FAIL_REGISTER:
    case FAIL_LOGIN:
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("userAuth");
      localStorage.removeItem("user");
      return {
        ...state,
        userAuth: null,
        errors: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
