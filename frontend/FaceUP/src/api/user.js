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

export const updateProfile = async (profileData) => {
    try {
        const formData = new FormData();
        
        Object.keys(profileData).forEach(key => {
            if (profileData[key] !== null && profileData[key] !== undefined) {
                formData.append(key, profileData[key]);
            }
        });

        const response = await axiosInstance.patch('/api/user/info/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error); 
        throw error;
    }
}