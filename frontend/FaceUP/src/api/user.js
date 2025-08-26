import axiosInstance from "../utils/axiosInstance";


export const getProfile = async () => {
    try {
        const response = await axiosInstance.get('/api/user/info/');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export const updateProfile = async ()=>{
    try{
        const response = await axiosInstance.patch('/api/user/info/');
        return response.data;
    } catch (error) {
        console.error('Error updading profie:', error);
        throw error;
    }
}