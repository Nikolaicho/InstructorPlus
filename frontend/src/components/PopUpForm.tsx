"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button, Input } from "@nextui-org/react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitFunc(formData);
    setIsSubmitting(false);
    setButton(0);
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
          transition={{ type: "spring", damping: 15 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
            <h2 className="text-2xl font-bold">Въведете сума</h2>

            <Button
              isIconOnly
              color="default"
              variant="light"
              onPress={() => setButton(0)}
              className="absolute top-4 right-4"
            >
              <X size={24} />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {rows.map((row: string, key: number) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.05 }}
              >
                <Input
                  label={row}
                  onChange={(e) =>
                    handleChange(jsonFields[key], e.target.value)
                  }
                  className="max-w-full"
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rows.length * 0.05 }}
            >
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Запази"}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormDocuments;
