import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, Calendar } from "lucide-react";
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  SelectItem,
  Select,
} from "@nextui-org/react";
import useSignNewExam from "../hooks/Profile/useSignNewExam";

interface ExamsPopUpProps {
  id: string | undefined;
  setButton: React.Dispatch<React.SetStateAction<number>>;
}

const ExamsPopUp: React.FC<ExamsPopUpProps> = ({ id, setButton }) => {
  const { signNewExam } = useSignNewExam(id);
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("theoretical");
  const [result, setResult] = useState<string>("yes");
  const [dateError, setDateError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (date === "") {
      setDateError(true);
      return;
    }
    setIsSubmitting(true);
    await signNewExam(result, type, date);
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
            <h2 className="text-2xl font-bold">Въведи изпит</h2>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <Select
                label="Тип"
                placeholder="Select exam type"
                selectedKeys={[type]}
                onChange={(e) => setType(e.target.value)}
              >
                <SelectItem key="theoretical" value="theoretical">
                  Теоретичен
                </SelectItem>
                <SelectItem key="practical" value="practical">
                  Практически
                </SelectItem>
              </Select>
            </div>
            <RadioGroup
              label="Резултат"
              orientation="horizontal"
              value={result}
              onValueChange={setResult}
              className="flex justify-around"
            >
              <Radio value="yes" color="success">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={18} />
                  ДА
                </div>
              </Radio>
              <Radio value="no" color="danger">
                <div className="flex items-center">
                  <XCircle className="mr-2 text-red-500" size={18} />
                  НЕ
                </div>
              </Radio>
            </RadioGroup>
            <div>
              <Input
                type="date"
                label="Дата"
                placeholder="Select date"
                isInvalid={dateError}
                errorMessage={dateError ? "Въведете валидна дата" : ""}
                onChange={(e) => {
                  setDateError(false);
                  setDate(e.target.value);
                }}
                startContent={
                  <Calendar className="text-default-400" size={18} />
                }
              />
            </div>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Обработва се" : "Запиши"}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExamsPopUp;
