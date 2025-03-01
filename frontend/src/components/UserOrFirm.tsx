"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Building2 } from "lucide-react";
import { Button } from "@nextui-org/react";

function UserOrFirm() {
  const navigate = useNavigate();

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Изберете ролята си
        </h1>
        <div className="space-y-6">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              startContent={<User size={24} />}
              className="w-full py-8 text-xl bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/sendRequestToFirm")}
            >
              Потребител
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              startContent={<Building2 size={24} />}
              className="w-full py-8 text-xl bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/createCorporation")}
            >
              Юридическо лице
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserOrFirm;
