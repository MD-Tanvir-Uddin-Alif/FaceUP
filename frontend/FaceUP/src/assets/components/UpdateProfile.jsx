import React, { useEffect, useState, useCallback } from "react";
import { useUpdateProfile, useUserProfile } from "../../hooks/useUser";
import { Camera } from "lucide-react";

const UpdateProfile = () => {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    image: null,
  });

  const handleChange = useCallback((e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0] || null;
      
      if (file) {
        setFormData((prevData) => ({ ...prevData, [name]: file }));
        setImagePreview(URL.createObjectURL(file));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: null }));
        if (profile?.image) {
          setImagePreview(profile.image);
        } else {
          setImagePreview(null);
        }
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }, [profile?.image]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Raw formData:", formData);
    
    updateProfileMutation.mutate(formData);
  }, [formData, updateProfileMutation]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        image: null,
      });
      setImagePreview(profile.image || null);
    }
  }, [profile?.id]);

  const InputField = useCallback(({
    label,
    type = "text",
    placeholder,
    value,
    name,
    maxLength,
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
      />
    </div>
  ), [handleChange]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile...</div>;
  }

  return (
    <div>
      {/* <p>This is update profile: {profile?.username}</p> */}

      {/* <div className="bg-gray-100 p-4 m-4 rounded-lg">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre className="text-xs overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
        {updateProfileMutation.error && (
          <div className="mt-2 p-2 bg-red-100 rounded">
            <p className="text-red-700 font-semibold">Error Details:</p>
            <p className="text-red-600 text-sm">
              {updateProfileMutation.error.response?.data 
                ? JSON.stringify(updateProfileMutation.error.response.data, null, 2)
                : updateProfileMutation.error.message}
            </p>
          </div>
        )}
      </div> */}

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Update Profile
          </h2>

          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={imagePreview || "https://via.placeholder.com/100"}
                alt="Avatar"
                className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              <label className="absolute bottom-0 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                <Camera className="text-black" size={16} />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="First Name"
                name="first_name"
                placeholder="John"
                value={formData.first_name}
              />
              <InputField
                label="Last Name"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Phone Number"
                type="tel"
                name="phone_number"
                placeholder="123-456-7890"
                value={formData.phone_number}
                maxLength={11}
              />
              <InputField
                label="Address"
                name="address"
                placeholder="123 Main St, City"
                value={formData.address}
              />
            </div>

            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="w-full py-3.5 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-300 shadow-md"
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;