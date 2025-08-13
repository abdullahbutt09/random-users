import React, { useState } from "react";
import { Users } from "lucide-react";

export default function StylishForm({onSubmitNumber}) {
  const [number, setNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitNumber && onSubmitNumber(number);
    setNumber("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-20 blur-sm"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Random User Generator
              </h2>
              <p className="text-purple-200/80 text-sm">
                Generate random user data instantly
              </p>
            </div>

            {/* Input field */}
            <div className="mb-8">
              <label className="block text-white/90 text-sm font-semibold mb-3">
                How many users do you need?
              </label>
              
              <div className="relative">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => {
                  const value = e.target.value;
                 if (value === "" || Number(value) <= 500) {
                 setNumber(value);
                 }
              }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter number of users"
                  required
                  min="1"
                  max="500"
                  className={`
                    w-full px-4 py-4 bg-white/10 backdrop-blur-sm border-2 rounded-2xl 
                    text-white placeholder-purple-200/60 font-medium text-lg
                    transition-all duration-300 outline-none
                    ${isFocused 
                      ? 'border-purple-400 shadow-lg shadow-purple-500/30 bg-white/15' 
                      : 'border-white/20 hover:border-white/40'
                    }
                  `}
                />
                
                {/* Floating label effect */}
                <div className={`
                  absolute right-4 top-1/2 transform -translate-y-1/2 
                  transition-all duration-300 pointer-events-none
                  ${number ? 'text-purple-300' : 'text-white/40'}
                `}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>

                {/* Focus ring */}
                {isFocused && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-400/50 ring-offset-2 ring-offset-transparent animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={!number}
              className={`
                w-full py-4 rounded-2xl font-bold text-white text-lg
                bg-gradient-to-r from-purple-600 to-blue-600
                hover:from-purple-500 hover:to-blue-500
                shadow-lg shadow-purple-500/30
                transform transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100
                ${isHovered && number ? 'scale-105 shadow-xl shadow-purple-500/40' : ''}
                ${!number ? 'grayscale' : ''}
              `}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Users</span>
              </span>
            </button>

            {/* Additional info */}
            <div className="mt-6 text-center">
              <p className="text-purple-200/60 text-xs">
                ✨ Generate up to 500 random users with detailed information
              </p>
            </div>
            </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-indigo-500 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
}