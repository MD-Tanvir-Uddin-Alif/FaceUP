import React from "react";
import { useLocation } from "react-router-dom";

const DetailsPost = () => {
  const location = useLocation();
  const post = location?.state;

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-600">No post found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[960px] mx-auto bg-[#fcfcf8] rounded-lg overflow-hidden mt-10">
      {post.image && (
        <div className="w-full aspect-[3/2]">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          ></div>
        </div>
      )}

      <div className="p-5">
        {/* <h1 className="text-[#1c1c0d] text-[22px] font-bold leading-tight">
          {post.title || "Untitled Post"}
        </h1> */}
        <p className="text-[#1c1c0d] text-base leading-relaxed mt-2">
          {post.content}
        </p>
      </div>

      <div className="p-5 border-t border-gray-200">
        <h3 className="text-[#1c1c0d] text-lg font-bold mb-4">Comments</h3>

        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#1c1c0d]">
                  {comment.author || "Anonymous"}
                </p>
                <span className="text-sm text-[#9e9d47]">
                  {comment.created_at || ""}
                </span>
              </div>
              <p className="text-sm text-[#1c1c0d]">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No comments yet</p>
        )}

        <div className="flex items-center gap-3 mt-5">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 rounded-lg bg-[#f4f4e6] px-4 py-2 text-sm text-[#1c1c0d] placeholder-[#9e9d47] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPost;
