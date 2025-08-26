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
            queryClient.setQueryData(["profile"], data);
            queryClient.invalidateQueries(["profile"]);
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            console.error('Update failed:', error);
            toast.error("Failed to update profile");
        },
    });
}

