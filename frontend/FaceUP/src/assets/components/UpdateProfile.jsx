import React, { useEffect, useState } from "react";
import { useUpdateProfile, useUserProfile } from "../../hooks/useUser";
import { Camera } from "lucide-react";

const UpdateProfile = () => {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const [imagePreview, setImagePreview] = useState(null);

  // ✅ include all possible fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    image: "",
  });

  // ✅ Correct useEffect usage
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        // Don't include image URL in formData - only include when user selects a new file
      });
      setImagePreview(profile.image || null);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0] || null;
      
      if (file) {
        // Only update formData if a file is actually selected
        setFormData((prevData) => ({ ...prevData, [name]: file }));
        setImagePreview(URL.createObjectURL(file));
      } else {
        // If no file selected, remove the image field from formData
        setFormData((prevData) => {
          const newData = { ...prevData };
          delete newData[name]; // Remove image field entirely
          return newData;
        });
        setImagePreview(profile?.image || null); // Reset to original image
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Raw formData:", formData);
    
    // Debug: Check what's being sent
    const debugFormData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== "") {
        debugFormData.append(key, formData[key]);
        console.log(`Adding to FormData: ${key} =`, formData[key]);
      } else {
        console.log(`Skipping empty field: ${key} =`, formData[key]);
      }
    });
    
    // Log FormData contents
    console.log("FormData entries:");
    for (let pair of debugFormData.entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }
    
    updateProfileMutation.mutate(formData);
  };

  const InputField = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
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
        onChange={onChange}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );

  return (
    <div>
      <p>
        {isLoading
          ? "Loading profile..."
          : `This is update profile: ${profile?.username}`}
      </p>

      {/* Debug Panel */}
      <div className="bg-gray-100 p-4 m-4 rounded-lg">
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
      </div>

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
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Phone Number"
                type="tel"
                name="phone_number"
                placeholder="123-456-7890"
                value={formData.phone_number}
                onChange={handleChange}
                maxLength={11}
              />
              <InputField
                label="Address"
                name="address"
                placeholder="123 Main St, City"
                value={formData.address}
                onChange={handleChange}
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