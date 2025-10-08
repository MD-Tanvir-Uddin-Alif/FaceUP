import React from 'react'
import { useGetUserFriends } from '../../hooks/useUser'

const Friends = () => {
    const {data: friends, isLoading: friLoading, error: friError} = useGetUserFriends()
  return (
    <div>
      <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-black">All People</h3>

      {friends?.length > 0 ? (
        friends.map((friend) => (
          <div
            key={friend.friend.id}
            className="flex min-h-20 items-center justify-between gap-4 bg-white px-4 py-2 border rounded-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={friend.friend.image}
                alt={friend.friend.username}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-black">{friend.friend.username}</p>
              </div>
            </div>
            <button
            // onClick={()=>handleFriendRequest(user.id)}
            // disabled={reqLoading}
            className="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300">
              {/* {reqLoading? 'Sending....':'Send Requset'} */} Remove
            </button>
          </div>
        ))
      ) : null}
    </div>
  )
}

export default Friends