import React from "react";
import { usePublicPost } from "../../hooks/usePost";

const PublicPost = () => {
  const { data: posts, isLoading, isError, error } = usePublicPost();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-red-500">
          Failed to load posts: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-[#fcfcf8]">
      <div className="layout-container flex h-full grow flex-col items-center py-10 gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full max-w-[640px] overflow-hidden rounded-lg"
            >
              {post.image && (
                <div className="aspect-video w-full bg-cover bg-center"style={{backgroundImage: `url(${post.image})`,}}></div>
                )}
              <div className="flex flex-col gap-2 p-5">
                <p className="text-sm font-medium text-[#9e9d47]">
                  By {post.author || "Unknown"}
                </p>
                <p className="text-base leading-relaxed text-[#1c1c0d]">
                  {post.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg font-medium">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default PublicPost;
