import React from 'react'
import { useUserProfile } from '../../hooks/useUser'

const UserProfile = () => {
    const { data: profile, isLoading, error } = useUserProfile();

    if (isLoading) return <p>Loading profile...</p>;
    if (error) return <p>Failed to load profile: {error.message}</p>;
    if (!profile) return <p>No profile data available</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl mb-8">
            <div className="flex items-center space-x-6 mb-8">
            <img className="h-24 w-24 rounded-full object-cover border-4 border-black" src={profile.image} alt="User Profile"/>
            <div>
                <h2 className="text-2xl font-semibold text-black"></h2>
                <p className="text-sm text-gray-500">Joined: </p>
            </div>
            </div>

            <div className="space-y-4 text-gray-800">
            <div>
                <p className="text-sm font-semibold">Full Name</p>
                <p>
                {profile.first_name} {profile.last_name}
                </p>
            </div>
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
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Edit Profile
                </button>
            </div>
        </div>
        </div>
    )
}

export default UserProfile