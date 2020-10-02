import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
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
import setToken from "../../utils/setToken";

const AuthState = (props) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    userAuth: localStorage.getItem("userAuth"),
    errors: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //getUser

  const getUser = async () => {
      if(localStorage.token){
          setToken(localStorage.token)
      }
    try {
      const res = await axios.get('/auth');
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

  //Signup

  const registerUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const res = await axios.post('/signup', userData, config);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data,
      });
      getUser();
    } catch (err) {
      dispatch({
        type: FAIL_REGISTER,
        payload: err.response.data,
      });
    }
  };

  //login user

  const loginUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.post("/login", userData, config);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data,
      });
      getUser();
    } catch (err) {
      dispatch({
        type: FAIL_LOGIN,
        payload: err.response.data,
      });
    }
  };

  //logout

  const logout = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        getUser: getUser,
        registerUser,
        loginUser,
        logout,
        setError,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
