import React from 'react'
import { useAllUser } from '../../hooks/useUser'

const AllPeople = () => {
  const { data: AllUser, isLoading: UserLoading, error: UserError } = useAllUser();

  return (
    <div>
      <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-black">All People</h3>

      {AllUser?.length > 0 ? (
        AllUser.map((user) => (
          <div
            key={user.id}
            className="flex min-h-20 items-center justify-between gap-4 bg-white px-4 py-2 border rounded-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.image}
                alt={user.username}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-black">{user.username}</p>
              </div>
            </div>
            <button className="h-8 rounded-lg bg-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-300">
              Send Request
            </button>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default AllPeople;
