import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost, publicPost } from "../api/post";



export const usePostCreate = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: (data)=>{
            console.log(data);
            queryClient.invalidateQueries(["posts"]);
        },
        onError: (error)=>{
            console.error("Error creating post:", error);
        }
    })
}

export const usePublicPost = ()=>{
    return useQuery({
        queryKey: ["Posts"],
        queryFn: publicPost,
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
}