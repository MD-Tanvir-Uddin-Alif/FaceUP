import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPost, publicPost, userDeletePost, userPost } from "../api/post";
import { data } from "react-router-dom";
import { toast } from "react-toastify";



export const usePostCreate = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: (data)=>{
            // console.log(data);
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

export const useUserPost = ()=>{
    return useQuery({
        queryKey: ["userPosts"],
        queryFn: userPost,
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
}


export const useUserDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userDeletePost,
    onSuccess: (_, postId) => { 
      queryClient.invalidateQueries(["userPosts"]);
      queryClient.invalidateQueries(["Posts"]);
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error("Failed to delete post");
    }
  });
};