"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FormProps {
  title: string;
  inputs: Array<any>;
  submitFunc: (data: any) => void;
  jsonFields: Array<string>;
  destination: string;
}

interface UserInfo {
  role: string;
  id: string;
}

const Form: React.FC<FormProps> = ({
  title,
  inputs,
  submitFunc,
  jsonFields,
  destination,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeInput, setActiveInput] = useState(-1);
  const navigate = useNavigate();

  const handleChange = (value: string, field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitFunc(formData);
    navigate(destination);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400  to-blue-900 animate-gradient-slow"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute h-[50vh] w-[50vh] rounded-full bg-blue-500 blur-[100px] top-[-10vh] left-[-10vh] animate-blob"></div>
          <div className="absolute h-[40vh] w-[40vh] rounded-full bg-purple-500 blur-[100px] bottom-[-10vh] right-[-10vh] animate-blob animation-delay-2000"></div>
          <div className="absolute h-[45vh] w-[45vh] rounded-full bg-pink-500 blur-[100px] bottom-[20vh] left-[20vw] animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400"></div>

            <div className="px-8 py-10">
              <motion.h2
                className="text-2xl font-bold text-white text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {title}
              </motion.h2>

              <div className="space-y-6">
                {inputs.map((input: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                    className="relative"
                  >
                    <div
                      className={`group relative rounded-lg overflow-hidden transition-all duration-300 ${
                        activeInput === index
                          ? "shadow-lg shadow-purple-500/20"
                          : ""
                      }`}
                    >
                      <input
                        type={
                          input.toLowerCase().includes("password")
                            ? "password"
                            : "text"
                        }
                        placeholder=" "
                        className="block w-full px-4 pt-6 pb-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                        onChange={(e) =>
                          handleChange(e.target.value, jsonFields[index])
                        }
                        onFocus={() => setActiveInput(index)}
                        onBlur={() => setActiveInput(-1)}
                      />
                      <label
                        className={`absolute text-sm text-white/70 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 
                          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-3`}
                      >
                        {input}
                      </label>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + inputs.length * 0.1,
                    duration: 0.5,
                  }}
                  className="mt-8"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-4 bg-blue-600 rounded-lg text-white font-bold text-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : null}
                      {title}
                    </span>
                  </button>
                  <div
                    className="text-center mt-[4px] te text-gray-300"
                    onClick={() => {
                      navigate("/logIn");
                    }}
                  >
                    Имате акаунт? Цъкнете тук
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Form;
