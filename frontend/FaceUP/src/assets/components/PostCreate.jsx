import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createPost } from '../../api/post';
import { usePostCreate } from '../../hooks/usePost';

const PostCreate = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const {mutate: createPost, isLoading} = usePostCreate();

    const handelImage = (e)=>{
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e)=>{
        if(!content.trim() && !image){
            toast.error("Please write something or upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);
        if(image){
            formData.append("image", image);
        }
        createPost(formData);
    };


  return (
    <div className="flex flex-col w-full max-w-[512px] md:max-w-[960px] py-5 mx-auto">
      <div className="flex justify-between items-center p-4">
        <p className="text-[#1c1c0d] text-2xl md:text-3xl font-bold leading-tight">
          Create Post
        </p>
      </div>

      <div className="flex flex-col w-full max-w-[480px] gap-4 px-4 py-3">
        <label className="w-full">
          <textarea
            placeholder="What's on your mind?"
            className="w-full min-h-36 resize-none rounded-xl border border-[#e9e8ce] bg-[#fcfcf8] p-4 text-base text-[#1c1c0d] placeholder:text-[#9e9d47] focus:border-[#d1d0a3] focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#e9e8ce] px-6 py-14">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-lg font-bold text-[#1c1c0d]">Upload</p>
            <p className="text-sm text-[#1c1c0d]">Drag and drop or click to upload</p>
          </div>

          <input
            type="file"
            accept="image/*"
            id="upload-input"
            onChange={handelImage}
            className="hidden"
          />

          <label
            htmlFor="upload-input"
            className="h-10 px-4 flex items-center justify-center rounded-full bg-[#f4f4e6] text-sm font-bold text-[#1c1c0d] hover:bg-[#e9e8ce] transition cursor-pointer"
          >
            {image ? image.name : "Upload"}
          </label>
        </div>
      </div>

      <div className="flex justify-end px-4 py-3">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="h-10 px-6 rounded-full border border-black bg-white text-sm font-bold text-[#1c1c0d] transition disabled:opacity-50"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>

  )
}

export default PostCreate