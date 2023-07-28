import baseAxios from "./axios";

export const GetRequest = (url='',config={}) => {
    return baseAxios.get(url,config)
}

export const PostRequest = (url='', data,config={}) => {
    return baseAxios.post(url,data, config);
}

export const PutRequest = (url='', data,config={}) => {
    return baseAxios.put(url, data,config);
}

export const DeleteRequest = (url='',config={}) => {
    return baseAxios.put(url, config);
}