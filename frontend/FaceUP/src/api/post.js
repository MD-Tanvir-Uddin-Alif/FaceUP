import { Key } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const createPost = async (postData)=> {
    try{
        const formData = new FormData();
        if(postData.content){
            formData.append("content", postData.content);
        }

        if(postData.image && postData.image instanceof File){
            formData.append("image", postData.image);
        }

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