import React from 'react';

const ToggleButton = ({ options, value, onChange }) => {
    console.log("Options -->",options);
    
    return (
        <div className="flex border w-auto max-w-[170px] rounded-lg overflow-hidden mx-auto">
            {options.map((option) => (
                <button
                    key={option.value}
                    className={`py-2 px-4 ${
                        value === option.value
                            ? 'bg-[#1E2837] text-white'
                            : 'bg-gray-100 text-gray-700'
                    } focus:outline-none`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default ToggleButton;
