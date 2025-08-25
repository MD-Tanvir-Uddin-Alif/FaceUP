import React from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

const Register = () => {
  const InputField = ({ label, type = "text", placeholder, value, onChange, name, maxLength }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Register Yourself
        </h2>

        {/* Avatar Upload */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
            <label className="absolute bottom-0 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
              <Camera className="text-black" size={16} />
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="First Name" name="first_name" placeholder="John" />
            <InputField label="Last Name" name="last_name" placeholder="Doe" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Username" name="username" placeholder="johndoe" />
            <InputField label="Email" type="email" name="email" placeholder="john@example.com" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Phone Number" type="tel" name="phone" placeholder="123-456-7890" />
            <InputField label="Address" name="address" placeholder="123 Main St, City" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Password" type="password" name="password" placeholder="••••••••" />
            <InputField label="Confirm Password" type="password" name="password1" placeholder="••••••••" />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-300 shadow-md"
          >
            Create Account
          </button>

          {/* Sign-in Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login/" className="font-medium text-black hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
