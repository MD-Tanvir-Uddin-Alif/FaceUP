import React from 'react'
import { useAcceptlRequest, useCancelRequest, useGetPendingRequest } from '../../hooks/useUser'

const PendingRequest = () => {
    const {data: pendingRequest, isLoading: penUserLoading, error: penUsererror} = useGetPendingRequest();
    const {mutate: cancelRequest, isLoading: canLoading, error: canError} = useCancelRequest();
    const {mutate: acceptRequest, isLoading: accLoading, error: accError} = useAcceptlRequest()

    // console.log(pendingRequest);

    const handelCancelRequest = (reqID)=>{
      // console.log(reqID);
      cancelRequest(reqID);
    }

    const handelAcceptRequest = (reqID)=>{
      // console.log(reqID);
      acceptRequest(reqID);
    }

  return (
    <div>
      <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-black">All People</h3>

      {pendingRequest?.length > 0 ? (
        pendingRequest.map((request) => (
          <div
            key={request.id}
            className="flex min-h-20 items-center justify-between gap-4 bg-white px-4 py-2 border rounded-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={request.from_user.image}
                alt={request.from_user.username}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-black">{request.from_user.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
                <button
                    disabled={accLoading}
                    onClick={()=>handelAcceptRequest(request.id)}
                    className="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300"
                >
                    Accept Request
                </button>
                <button
                    disabled={canLoading}
                    onClick={()=>handelCancelRequest(request.id)}
                    className="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300"
                >
                    {canLoading? 'canceling...' : 'Cancel Request'}
                </button>
                </div>
            </div>
        ))
      ) : null}
    </div>
  );
}

export default PendingRequest