"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import useGetAllInstructors from "../hooks/Documents/useGetAllInstructors";
import useGetAllCars from "../hooks/Documents/useGetAllCars";

interface FormDocumentsProps {
  type: string;
  submitFunc: (data: any) => void;
  jsonFields: Array<string>;
  setButton: React.Dispatch<React.SetStateAction<number>>;
}

const PopUpDelete: React.FC<FormDocumentsProps> = ({
  type,
  submitFunc,
  jsonFields,
  setButton,
}) => {
  const { instructors } = useGetAllInstructors();
  const { cars } = useGetAllCars();
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {type === "car" ? "Премахни кола" : "Премахни инструктор"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitFunc(formData);
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="selectItem"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {type === "car" ? "Номер на колата" : "Име на инструктор"}
              </label>
              <select
                id="selectItem"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) =>
                  handleChange(
                    type === "car" ? "register" : "id",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Избери {type === "car" ? "Кола" : "Инструктор"}
                </option>
                {type === "car"
                  ? cars?.map((car: any) => (
                      <option key={car._id} value={car._id}>
                        {car._id}
                      </option>
                    ))
                  : instructors?.map((instructor: any) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.firstName} {instructor.lastName}
                      </option>
                    ))}
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Изтрий
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUpDelete;
