"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Building2, Phone, MapPin, ArrowRight, X } from "lucide-react";
import {
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
  Spinner,
} from "@nextui-org/react";
import useSendRequestToJoin from "../hooks/ChooseCorporation/useSendRequestToJoin";
import { socket } from "../socket";

function ChooseCorporation() {
  const [results, setResults] = useState<any[]>([]);
  const [chosenCorp, setChosenCorp] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendRequestToJoin } = useSendRequestToJoin();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("results", (result) => {
      setIsLoading(false);
      setResults(result);
      setChosenCorp(null);
    });

    socket.on("error", (errorMessage) => {
      setIsLoading(false);
      setError(errorMessage);
    });

    return () => {
      socket.off("results");
      socket.off("error");
      socket.off("connect");
      socket.close();
    };
  }, []);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setError(null);
    socket.send(value);
  };

  const handleJoin = () => {
    if (chosenCorp !== null) {
      sendRequestToJoin(results[chosenCorp].id);
      navigate("/ThankYou");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-20">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center text-gray-800 mb-8"
          >
            Изберете фирма
          </motion.h1>
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Търсете по име или ЕИК на фирма"
              startContent={<Search className="text-gray-400" />}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full text-lg"
              size="lg"
            />
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <Spinner size="sm" color="primary" />
                </motion.div>
              )}
              {results.length > 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                >
                  <div className="results">
                    {results.map((result: any, index: number) => (
                      <motion.div
                        key={result.id}
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="p-3 cursor-pointer border-b last:border-b-0 transition-colors duration-200"
                        onClick={() => {
                          setChosenCorp(index);

                          document
                            .getElementsByClassName("results")[0]
                            .classList.toggle("hidden");
                        }}
                      >
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-gray-500">{result.id}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center mb-4 p-3 bg-red-100 rounded-lg"
            >
              <p className="flex items-center justify-center">
                <X className="mr-2" size={18} />
                {error}
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {chosenCorp !== null && results[chosenCorp] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="bg-blue-100 bg-opacity-50">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Информация за фирмата
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Building2 className="mr-3 text-blue-600" size={24} />
                        <div>
                          <p className="text-sm text-gray-500">ЕИК</p>
                          <p className="font-medium">
                            {results[chosenCorp].id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="mr-3 text-blue-600" size={24} />
                        <div>
                          <p className="text-sm text-gray-500">Име</p>
                          <p className="font-medium">
                            {results[chosenCorp].name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-3 text-blue-600" size={24} />
                        <div>
                          <p className="text-sm text-gray-500">Телефон</p>
                          <p className="font-medium">
                            {results[chosenCorp].telephone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-3 text-blue-600" size={24} />
                        <div>
                          <p className="text-sm text-gray-500">Адрес</p>
                          <p className="font-medium">
                            {results[chosenCorp].address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 flex justify-center"
                >
                  <Button
                    color="primary"
                    endContent={<ArrowRight className="ml-2" size={18} />}
                    size="lg"
                    onClick={handleJoin}
                    className="px-8 py-6 text-lg font-semibold tracking-wide"
                  >
                    Кандидатствай
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default ChooseCorporation;
