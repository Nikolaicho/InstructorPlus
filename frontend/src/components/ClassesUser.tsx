"use client";

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import useGetAllClasses from "../hooks/ClassesUser/useGetAllClasses";
import useIsAdmin from "../hooks/Admin/useIsAdmin";

function ClassesUser() {
  const { id } = useParams();
  const { classes } = useGetAllClasses(id);
  const { isAdmin } = useIsAdmin();

  // Animation variants for staggered list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">График</h1>
              <p className="text-slate-500 mt-2">
                Проследете всичките си часове
              </p>
            </header>

            {classes && classes.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 md:grid-cols-2"
              >
                {classes.map((oneClass: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden"
                  >
                    <div className="h-2 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <User className="h-5 w-5 text-slate-400 mr-2" />
                        <h3 className="font-medium text-slate-700">
                          {oneClass.firstNameInstructor}{" "}
                          {oneClass.lastNameInstructor}
                        </h3>
                      </div>

                      <div className="flex items-center text-slate-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          {oneClass.start} - {oneClass.end}
                        </span>
                      </div>

                      {oneClass.date && (
                        <div className="flex items-center text-slate-500 mt-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{oneClass.date}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">
                <Calendar className="h-12 w-12 mx-auto text-slate-300" />
                <h3 className="mt-4 text-lg font-medium text-slate-700">
                  Няма записани часове
                </h3>
                <p className="mt-2 text-slate-500 max-w-md mx-auto">
                  Нямате записани часове. Свържете се с администратор ако
                  смятате, че има грешка.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClassesUser;
