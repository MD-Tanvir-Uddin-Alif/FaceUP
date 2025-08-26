import axiosInstance from "../utils/axiosInstance";


export const getProfile = async ()=>{
    const responce = await axiosInstance.get('/api/user/info/');
    return responce.data;
}