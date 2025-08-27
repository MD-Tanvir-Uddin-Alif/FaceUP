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
        console.log("=== API FUNCTION DEBUG ===");
        console.log("Original profileData:", profileData); 
        
        Object.keys(profileData).forEach(key => {
            const value = profileData[key];
            
            if (key === 'image') {
                if (value instanceof File) {
                    formData.append(key, value);
                    console.log(`Added image file: ${value.name}, size=${value.size}, type=${value.type}`);
                } else {
                    console.log(`Skipped image field (not a file): ${key} =`, typeof value, value);
                }
                return;
            }
            
            if (value !== null && value !== undefined && value !== "") {
                formData.append(key, value);
                console.log(`dded to FormData: ${key} =`, value);
            } else {
                console.log(`Skipped empty field: ${key} =`, value);
            }
        });

        console.log("Final FormData entries:");
        for (let pair of formData.entries()) {
            console.log(`  ${pair[0]}: ${pair[1]}`);
        }

        console.log("Making API call to:", '/api/user/info/');
        
        const response = await axiosInstance.patch('/api/user/info/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        
        console.log("API Response success:", response.data);
        return response.data;
        
    } catch (error) {
        console.error(' API Error Details:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        }
        
        throw error;
    }
}