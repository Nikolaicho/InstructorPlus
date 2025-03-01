"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FormDocumentsProps {
  rows: string[];
  submitFunc: (data: any) => void;
  jsonFields: Array<string>;
  setButton: React.Dispatch<React.SetStateAction<number>>;
}

const PopUpAdd: React.FC<FormDocumentsProps> = ({
  rows,
  submitFunc,
  jsonFields,
  setButton,
}) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
        >
          <button
            onClick={() => setButton(0)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Добави</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitFunc(formData);
            }}
          >
            {rows.map((row: string, key: number) => (
              <div key={key} className="mb-4">
                <label
                  htmlFor={jsonFields[key]}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {row}
                </label>
                <input
                  id={jsonFields[key]}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    handleChange(jsonFields[key], e.target.value)
                  }
                />
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Запази
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpAdd;
