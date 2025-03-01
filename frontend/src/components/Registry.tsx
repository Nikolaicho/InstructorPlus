"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Search, ChevronRight } from "lucide-react";
import useGetAllCandidates from "../hooks/Registry/useGetAllCandidates";
import useIsAdmin from "../hooks/Admin/useIsAdmin";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Input, Button } from "@nextui-org/react";

function Registry() {
  const { userInfo } = useGetAllCandidates();
  const navigate = useNavigate();
  const { isAdmin } = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userInfo);

  useEffect(() => {
    if (userInfo) {
      setFilteredUsers(
        userInfo.filter((user: any) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, userInfo]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Регистър</h1>
          <div className="mb-6">
            <Input
              placeholder="Потърсете потребител"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="text-gray-400" />}
              className="max-w-md"
            />
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredUsers?.map((user: any) => (
                <motion.div
                  key={user._id}
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
                        {user.firstName} {user.lastName}
                      </h2>
                    </div>
                    <Button
                      color="primary"
                      endContent={<ChevronRight className="ml-2" size={16} />}
                      className="w-full"
                      onClick={() => navigate(`/profile/${user._id}`)}
                    >
                      Виж профил
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredUsers?.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                Няма намерени потребители
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Променете търсенето си
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Registry;
