"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Trash2, Award, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import useDeleteExams from "../hooks/Profile/useDeleteExams";
import useIsAdmin from "../hooks/Admin/useIsAdmin";

interface ExamRow {
  event: string;
  date: string;
  result: string | undefined;
  id: string;
}

interface ExamsTableProps {
  exams: ExamRow[];
}

const ExamsTable: React.FC<ExamsTableProps> = ({ exams }) => {
  const { deleteExam } = useDeleteExams();
  const [localExams, setLocalExams] = useState<ExamRow[]>([]);
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    if (exams.length > 0) {
      setLocalExams(exams);
    }
  }, [exams]);

  const handleDelete = (id: string, index: number) => {
    deleteExam(id);
    const updatedExams = [...localExams];
    updatedExams.splice(index, 1);
    setLocalExams(updatedExams);
  };

  // Function to determine result icon and color
  const getResultDisplay = (result: string | undefined) => {
    if (!result)
      return {
        icon: <AlertCircle className="h-4 w-4 text-gray-400" />,
        color: "text-gray-500",
      };

    const lowerResult = result.toLowerCase();
    if (lowerResult.includes("успешно") || lowerResult.includes("издържан")) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        color: "text-green-600",
      };
    } else if (
      lowerResult.includes("неуспешно") ||
      lowerResult.includes("неиздържан")
    ) {
      return {
        icon: <XCircle className="h-4 w-4 text-red-500" />,
        color: "text-red-600",
      };
    }

    return {
      icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
      color: "text-yellow-600",
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 px-4 flex items-center">
        <Award className="h-5 w-5 text-white mr-2" />
        <h3 className="text-white font-semibold">Преминали изпити</h3>
      </div>

      {localExams.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Няма записани изпити
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {localExams.map((exam, index) => {
            const { icon, color } = getResultDisplay(exam.result);

            return (
              <div
                key={exam.id}
                className="p-4 hover:bg-gray-50 transition-colors relative"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{exam.event}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{exam.date}</span>
                    </div>

                    <div className={`flex items-center mt-1 ${color}`}>
                      {icon}
                      <span className="ml-1 text-sm">
                        {exam.result || "Няма резултат"}
                      </span>
                    </div>
                  </div>

                  {isAdmin ? (
                    <button
                      onClick={() => handleDelete(exam.id, index)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExamsTable;
