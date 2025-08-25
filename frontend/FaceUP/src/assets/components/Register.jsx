import React from 'react'

const Register = () => {


    const InputField = ({ label, type = 'text', placeholder, value, onChange, name, maxLength }) => (
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
    <div>
        <p>this is rejistration page</p>
    </div>
  )
}

export default Register