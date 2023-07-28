import {GetRequest, PostRequest, PutRequest} from "../plugins/https";

export const APIAuthenticateUser = (data)=>{
    return PostRequest('user/login', data);
}

export const APIRegisterUser = (data)=>{
    return PostRequest('user/register', data);
}


