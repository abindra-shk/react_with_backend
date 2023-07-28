// import { SET_LOGIN, SET_USERNAME } from "./actionTypes";
import {LOGOUT_USER, SET_AUTH_DATA, SET_TOKEN, SET_USER} from "./actionTypes";
import {getToken} from "../../utils/helpers/tokenStorage.helper";
import {isAuthenticated} from "../../utils/helpers/checkIfAuthenticated";

const initialState = {
  authenticated: {},
  isLoggedIn: isAuthenticated(),
  user: "",
  token: getToken()
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
          ...state,
          authenticated: action.payload.authenticated,
          user: action.payload.user,
          isLoggedIn: true
      }

    // case SET_LOGIN:
    //   return {
    //     ...state,
    //     isLoggedIn: action.payload,
    //   };
    // case SET_USERNAME:
    //   return {
    //     ...state,
    //     username: action.payload,
    //     isLoggedIn: true,
    //   };
    case LOGOUT_USER:
          return {
              ...state,
              isLoggedIn: false
          }
    case SET_TOKEN:
      return {
          ...state,
          token: action.payload,
          isLoggedIn: !!action.payload
      }
    case SET_USER:
      return {
          ...state,
          user: action.payload,
      }
    

    default:
      return {
        ...state,
      };
  }
};

export const loginState = state => state.authReducer
