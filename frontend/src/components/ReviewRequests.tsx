"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, User, AlertTriangle } from "lucide-react";
import useGetAllRequests from "../hooks/ReviewRequests/useGetAllRequests";
import useRespondToRequest from "../hooks/ReviewRequests/useRespondToRequest";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function ReviewRequests() {
  const { requests, setRequests } = useGetAllRequests();
  const { respondToRequest } = useRespondToRequest();

  const removeRequestFromUi = (index: number) => {
    setRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
  };

  const handleResponse = async (
    approved: boolean,
    userId: string,
    requestId: string,
    index: number
  ) => {
    await respondToRequest(approved, userId, requestId);
    removeRequestFromUi(index);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Преглед на нови заявки
          </h1>
          <AnimatePresence>
            {requests && requests.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {requests.map((request: any, index: number) => (
                  <motion.div
                    key={request.requestId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-full p-3">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="ml-3 text-xl font-semibold text-gray-800">
                          {request.firstName} {request.lastName}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600"
                          onClick={() =>
                            handleResponse(
                              true,
                              request.userId,
                              request.requestId,
                              index
                            )
                          }
                        >
                          <Check className="mr-2" size={18} />
                          Одобри
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-red-600"
                          onClick={() =>
                            handleResponse(
                              false,
                              request.userId,
                              request.requestId,
                              index
                            )
                          }
                        >
                          <X className="mr-2" size={18} />
                          Откажи
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-lg font-medium text-gray-900">
                  Няма нови заявки
                </h2>
                <p className="mt-2 text-sm text-gray-500">Няма нови заявки</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default ReviewRequests;
