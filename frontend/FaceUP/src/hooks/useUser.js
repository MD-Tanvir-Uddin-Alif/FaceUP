import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { cancelRequest, getAllUser, getPendingRequest, getProfile, getUserFriends, updateProfile, usersendFriendRequest } from "../api/user"
import { toast } from "react-toastify";
import AllPeople from "../assets/components/AllPeople";

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


export const useAllUser = ()=>{
    return useQuery({
        queryKey: ["AllUser"],
        queryFn: getAllUser,
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
}

export const useUserFreendRequest = ()=>{
    return useMutation({
        mutationFn: usersendFriendRequest,
        onSuccess: (data)=>{
            toast.success("Friend request send sucessfully");
        },
        onError:(error)=>{
            toast.error("Unavle to send friend Request");
        }
    })
}


export const useGetPendingRequest = ()=>{
    return useQuery({
        queryKey: ["pending_request"],
        queryFn: getPendingRequest,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}


export const useCancelRequest = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelRequest,
        onSuccess: (data)=>{
            queryClient.invalidateQueries(["pending_request"]);
            toast.success('Cancel friend request');
        },
        onError: (error)=>{
            toast.error("Something went worng");
        }
    })
}

export const useAcceptlRequest = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelRequest,
        onSuccess: (data)=>{
            queryClient.invalidateQueries(["pending_request"]);
            toast.success('Accepted as friend ');
        },
        onError: (error)=>{
            toast.error("Something went worng");
        }
    })
}

export const useGetUserFriends = ()=>{
    return useQuery({
        queryKey: ["User_Friends"],
        queryFn: getUserFriends,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}