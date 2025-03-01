"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import useGetAllInstructors from "../hooks/Documents/useGetAllInstructors";
import useGetAllCars from "../hooks/Documents/useGetAllCars";
import useGetAllDocuments from "../hooks/Documents/useGetAllDocuments";

interface FormDocumentsProps {
  rows: string[];
  submitFunc: (data: any) => void;
  jsonFields: Array<string>;
  setButton: React.Dispatch<React.SetStateAction<number>>;
}

const FormDocuments: React.FC<FormDocumentsProps> = ({
  rows,
  submitFunc,
  jsonFields,
  setButton,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [documentType, setDocumentType] = useState<string>("car");
  const { instructors } = useGetAllInstructors();
  const { cars } = useGetAllCars();
  const { documents, setDocuments } = useGetAllDocuments();
  const [trigger, setTrigger] = useState(false);
  const [newDoc, setNewDoc] = useState<any>();

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const addDocumentToUI = async (newDoc: any) => {
    const resolvedDoc = await newDoc;
    setDocuments((prevDocs = []) => [...prevDocs, resolvedDoc]);
  };

  useEffect(() => {
    if (newDoc) {
      addDocumentToUI(newDoc);
    }
  }, [newDoc]);

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
            Добави документ
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitFunc(formData);
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Тип
              </label>
              <select
                id="documentType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="car">За кола</option>
                <option value="person">За инструктор</option>
              </select>
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="relatedTo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Собственик
              </label>
              <select
                id="relatedTo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleChange("relatedTo", e.target.value)}
              >
                <option value="">
                  Избери {documentType === "car" ? "a car" : "an instructor"}
                </option>
                {documentType === "car"
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

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Дата
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  onChange={(e) =>
                    handleChange(
                      jsonFields[jsonFields.length - 1],
                      e.target.value
                    )
                  }
                />
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Запиши
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormDocuments;
