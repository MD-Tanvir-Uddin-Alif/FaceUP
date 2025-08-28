import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "../api/post";



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