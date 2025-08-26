import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";
import axiosPublic from "../../utils/axiospublic";

const InputField = ({ label, type = "text", placeholder, value, onChange, name, maxLength }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    image: null,
    address: "",
    password: "",
    password2: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0] || null;
      setFormData((prevData) => ({ ...prevData, [name]: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }


    try{
      const formDatatosend = new FormData();
      Object.entries(formData).forEach(([key, value])=>{
      formDatatosend.append(key, value);
      });
      
      const responce = await axiosPublic.post('/api/user/registration/', formDatatosend,{
        headers: {
              "Content-Type": 'multipart/form-data',
            },
      })
      console.log("Form Data:", formData);
      toast.success("Account created successfully 🚀");
    }catch(err){
      console.log(err.response.data);
      toast.error("Registrations Failed. Please try again");
    }
    

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Register Yourself
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

        <form onSubmit={handleSubmission} className="space-y-5">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="password2"
              placeholder="••••••••"
              value={formData.password2}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-300 shadow-md"
          >
            Create Account
          </button>

          {/* <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login/"
              className="font-medium text-black hover:underline"
            >
              Sign in
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
