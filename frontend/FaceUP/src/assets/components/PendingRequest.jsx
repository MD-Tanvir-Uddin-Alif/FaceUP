import React from 'react'
import { useGetPendingRequest } from '../../hooks/useUser'

const PendingRequest = () => {
    const {data: pendingRequest, isLoading: penUserLoading, error: penUsererror} = useGetPendingRequest();
  return (
    <div>
      <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-black">All People</h3>

      {pendingRequest?.length > 0 ? (
        pendingRequest.map((user) => (
          <div
            key={user.id}
            className="flex min-h-20 items-center justify-between gap-4 bg-white px-4 py-2 border rounded-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.from_user.image}
                alt={user.from_user.username}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-black">{user.from_user.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
                <button
                    className="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300"
                >
                    Accept Request
                </button>
                <button
                    className="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300"
                >
                    Cancel Request
                </button>
                </div>
            </div>
        ))
      ) : null}
    </div>
  );
}

export default PendingRequest