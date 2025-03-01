"use client";

import { motion } from "framer-motion";
import { CheckCircle, Loader } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

function ThankYou() {
  useEffect(() => {
    // Trigger confetti effect when component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 to-blue-600 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="inline-block mb-6"
        >
          <CheckCircle size={80} className="text-green-400" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Благодарим Ви!</h1>
        <p className="text-xl mb-8">
          Вашата кандидатура е получена успешно. Моля, изчакайте одобрение.
        </p>
        <div className="flex items-center justify-center space-x-2 text-lg">
          <Loader className="animate-spin" />
          <span>Обработва се...</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ThankYou;
