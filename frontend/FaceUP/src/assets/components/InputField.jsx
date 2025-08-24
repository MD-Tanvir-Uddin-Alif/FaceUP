import React from 'react'

const InputField = ({label, type, name, placeholder, value, onChange, maxLength}) => {
  return (
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
  )
}

export default InputField