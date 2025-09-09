import { Key } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import axiosPublic from "../utils/axiospublic";

export const createPost = async (formData)=> {
    console.log("in api",formData);
    try{
        const response = await axiosInstance.post('/api/post/create/',formData,{
            headers: {"Content-Type": "multipart/form-data"}
        });

        toast.success("Post created successfully");
        return response.data;
    }catch(error){
        console.error("Create post error:", error.response?.data || error.message);
        toast.error("something went wrong");
        throw error;
    }
}



export const publicPost = async ()=>{
    try{
        const response = await axiosPublic.get('/api/post/all/');
        return response.data;
    } catch(error){
        console.error('Error fetching post:', error);
        throw error;
    }
}


export const userPost = async ()=>{
    try{
        const response = await axiosInstance.get('/api/post/user/');
        return response.data;
    }catch (error){
        console.error("Error fetching user post:", error);
        throw error;
    }
}

export const userDeletePost = async (postId)=>{
    try{
        const response = await axiosInstance.delete(`/api/post/info/${postId}/`);
        // toast.success("Deleted Sucessfully");
        return response.data;
    } catch(error){
        // toast.error("Something went wrong try again");
        console.log(error);
        throw error;
    }
}


export const userUpdatePost = async ({postId, updatedData})=>{
    try{
        const formData = new FormData();

        if(updatedData.content){
            formData.append("content", updatedData.content);
        }
        if(updatedData.image){
            formData.append("image", updatedData.image);
        }

        const response = await axiosInstance.patch(`/api/post/info/${postId}/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
};