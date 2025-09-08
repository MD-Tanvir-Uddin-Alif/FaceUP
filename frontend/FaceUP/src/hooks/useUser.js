import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProfile, updateProfile } from "../api/user"
import { toast } from "react-toastify";

export const useUserProfile = () => {
    return useQuery({
        queryKey: ["profile"], 
        queryFn: getProfile,
        staleTime: 5 * 60 * 1000,
        retry: 2
    });
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile, 
        onSuccess: (data) => { 
            // console.log("Mutation Success:", data);
            queryClient.setQueryData(["profile"], data);
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            console.error('Mutation Error:');
            console.error('Full error object:', error);
            
            let errorMessage = "Failed to update profile";
            
            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else {
                    const errors = Object.values(error.response.data).flat();
                    if (errors.length > 0) {
                        errorMessage = errors.join(', ');
                    }
                }
            }
            
            console.error('Processed error message:', errorMessage);
            toast.error(errorMessage);
        },
    });
}