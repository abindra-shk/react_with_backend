// import { SET_LOGIN, SET_USERNAME } from "./actionTypes";
// import axios from "axios";
import baseAxios from "../../plugins/axios";
import {SET_AUTH_DATA, SET_TOKEN, SET_USER} from "./actionTypes";
import {
  APIAuthenticateUser,
  APIRegisterUser,
} from "../../api/auth";
import {AxiosResponse} from "axios";
import {clearStorage, getToken, saveToken, saveUser} from "../../utils/helpers/tokenStorage.helper";


const setAuthorizationHeader = (token) => {
  baseAxios.defaults.headers.common['Authorization'] = 'bearer ' + getToken();
}

const deleteAuthorizationHeader = () => {
  delete baseAxios.defaults.headers.common.Authorization;
}

export const setAuthData = (data) => {
  return {
      type: SET_AUTH_DATA,
      payload: data
  }
}
export const setUserData = (data) => {
  saveUser(data);
  return {
      type: SET_USER,
      payload: data
  }
}

export const authenticateUser = (user) => async (dispatch) => {
  const res = await APIAuthenticateUser(user);
  console.log(res);
  if (res) {
      dispatch(setAuthData({user: res?.data}));
      saveToken(res.token?.token);
      saveUser(res?.data);
      setAuthorizationHeader(res.data);
  }
  return res;
}

export const createUser = (user) => async (dispatch) => {
  const res = await APIRegisterUser(user);
}

export const logoutUser = () => (dispatch) => {
  clearStorage();
  deleteAuthorizationHeader();
  dispatch(setToken(null));
}

export const setToken = (token) => {
  return {
      type: SET_TOKEN,
      payload: token
  }
}

export const checkIfAuthenticated = () => (dispatch) => {
  const token = getToken() ?? null;
  dispatch(setToken(token))
}




// export const setLogin = (isLoggedIn) => {
//     return {
//       type: SET_LOGIN,
//       payload: isLoggedIn,
//     };
//   };
  
// export const setUsername = (username) => {
//   return {
//     type: SET_USERNAME,
//     payload: username,
//   };
// };
 
//   const submitForm=async (e)=>{
//     e.preventDefault();
//     try{    
//         const res = await axios.post("http://localhost:8081/user/login",user);

//         // console.log(res)
//         dispatch({type: 'SET_USERNAME', payload: res.data.data.username})

        
//         // console.log('res ' , res);
//         localStorage.setItem("username",res.data.data.username);
//         console.log(localStorage.getItem("username"));
//         navigate('/todo')
//        }catch(e){
//         console.log(e);
//        }
// }