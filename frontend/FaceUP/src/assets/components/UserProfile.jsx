import React from 'react'
import { useUserProfile } from '../../hooks/useUser'
import { useUserPost, useUserDeletePost } from '../../hooks/usePost'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const UserProfile = () => {
  const { data: profile, isLoading, error } = useUserProfile();
  const { data: posts, isLoading: postsLoading, isError: postsError, error: postsErrorData } = useUserPost();
  const { mutate: deletePost, isLoading: isDeleting } = useUserDeletePost();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading profile...</p>
  if (error) return <p>Failed to load profile: {error.message}</p>
  if (!profile) return <p>No profile data available</p>

  const handleDelete = (postId) => {
    toast.error((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-800">
          Are you sure you want to delete this post?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              deletePost(postId)  
              toast.dismiss(t.id) 
            }}
            className="px-3 py-1 rounded bg-black text-white hover:bg-white hover:text-black"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 4000,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4">
      {/* Profile Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl mb-8">
        <div className="flex items-center space-x-6 mb-8">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-black"
            src={profile.image}
            alt="User Profile"
          />
          <div>
            <h2 className="text-2xl font-semibold text-black">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-sm text-gray-500">
              Joined: {new Date(profile.date_joined).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-gray-800">
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p>{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Phone</p>
            <p>{profile.phone_number || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Address</p>
            <p>{profile.address || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/user/profile/update/">
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Edit Profile
            </button>
          </Link>
          <Link to="/post/create/">
            <button className="px-4 py-2 bg-white text-black rounded-lg border-black border hover:bg-black transition hover:text-white">
              Post
            </button>
          </Link>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="relative flex w-full max-w-3xl flex-col items-center gap-6">
        {postsLoading && (
          <p className="text-gray-600 text-lg font-medium">Loading posts...</p>
        )}

        {postsError && (
          <p className="text-lg font-medium text-red-500">
            Failed to load posts: {postsErrorData?.message || 'Unknown error'}
          </p>
        )}

        {!postsLoading && !postsError && posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full max-w-[640px] overflow-hidden rounded-lg bg-white shadow-md"
            >
              {post.image && (
                <div
                  className="aspect-video w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
              )}
              <div className="flex flex-col gap-2 p-5">
                <p className="text-sm font-medium text-[#9e9d47]">
                  By {post.author || 'Unknown'}
                </p>
                <p
                  onClick={() => navigate('/post/detail/', { state: post })}
                  className="text-base leading-relaxed text-[#1c1c0d] cursor-pointer hover:underline"
                >
                  {post.content}
                </p>
                 <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 rounded-lg border border-black bg-black text-white hover:bg-white hover:text-black transition">
                    Update
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg border border-black bg-white text-black hover:bg-black hover:text-white transition disabled:opacity-50"
                    disabled={isDeleting}
                    onClick={() => handleDelete(post.id)}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !postsLoading &&
          !postsError && (
            <p className="text-gray-600 text-lg font-medium">No posts available</p>
          )
        )}
      </div>
    </div>
  )
}

export default UserProfile
