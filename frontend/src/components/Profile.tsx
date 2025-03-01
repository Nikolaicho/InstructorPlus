"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Award, CreditCard } from "lucide-react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import ProfileCard from "./ProfileCard";
import ExamsTable from "./ExamsTable";
import PaymentsTable from "./PaymentTable";
import ExamsPopUp from "../components/ExamsPopUp";
import useGetCandidateInfo from "../hooks/Profile/useGetCandidateInfo";
import useMakeTransaction from "../hooks/Profile/useMakeTransaction";
import useGetAllExams from "../hooks/Profile/useGetAllExams";
import useGetAllTransactions from "../hooks/Profile/useGetAllTransactions";
import useIsAdmin from "../hooks/Admin/useIsAdmin";
import PopUpForm from "./PopUpForm";

function Profile() {
  const { id } = useParams();
  const { userInfo } = useGetCandidateInfo(id);
  const { makeTransaction } = useMakeTransaction(id);
  const { exams } = useGetAllExams(id);
  const { transactions } = useGetAllTransactions(id);
  const [popUpActive, setPopUpActive] = useState<number>(0);
  const { isAdmin } = useIsAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex">
        <SideBar />
        {popUpActive === 1 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <PopUpForm
              rows={["Заплатена сума:"]}
              submitFunc={makeTransaction}
              jsonFields={["sum"]}
              setButton={setPopUpActive}
            />
          </div>
        )}
        {popUpActive === 2 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ExamsPopUp id={id} setButton={setPopUpActive} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header with Admin Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Профил на курсиста
              </h1>

              {isAdmin && (
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={() => setPopUpActive(1)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Добави плащане</span>
                  </button>
                  <button
                    onClick={() => setPopUpActive(2)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <Award className="h-4 w-4" />
                    <span>Добави изпит</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <ProfileCard info={userInfo} />
              </div>

              {/* Tables */}
              <div className="lg:col-span-2 space-y-6">
                <ExamsTable
                  exams={
                    exams
                      ? exams.map((exam: any) => ({
                          event: exam.type,
                          date: exam.date,
                          result: exam.result,
                          id: exam.id,
                        }))
                      : []
                  }
                />

                <PaymentsTable
                  transactions={
                    transactions
                      ? transactions.map((transaction: any) => ({
                          event: transaction.sum,
                          date: transaction.date,
                          id: transaction.id,
                        }))
                      : []
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
