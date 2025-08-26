import React from 'react'
import { useUserProfile } from '../../hooks/useUser'

const UserProfile = () => {
    const { data: profile, isLoading, error } = useUserProfile();

    if (isLoading) return <p>Loading profile...</p>;
    if (error) return <p>Failed to load profile: {error.message}</p>;
    if (!profile) return <p>No profile data available</p>;

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone_number}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                {profile.image && (
                    <div>
                        <strong>Profile Picture:</strong>
                        <img 
                            src={profile.image} 
                            alt="Profile" 
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfile