"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { TimeInput } from "@heroui/react";
import { Plus, X, Search, CalendarIcon } from "lucide-react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import useIsAdmin from "../hooks/Admin/useIsAdmin";
import useClass from "../hooks/Admin/useClass";
import useTodayDate from "../hooks/Admin/useTodayDate";
import useTodayClasses from "../hooks/Admin/useTodayClasses";
import useSearchCandidate from "../hooks/Admin/useSearchCandidates";
import useGetTimeLeft from "../hooks/Admin/useGetTimeLeft";
import useDeleteClass from "../hooks/Admin/useDeleteClass";
import type { Candidate } from "../interfaces/candidate.interface";

function Admin() {
  const { isAdmin } = useIsAdmin();
  const { setSelectedDate, selectedDate, signNewClass } = useClass();
  const dateString = useTodayDate();
  const { getTimeLeft, workingTime } = useGetTimeLeft();
  const [name, setName] = useState("");
  const [candidate, setCandidate] = useState("");
  const { searchCandidates, candidates } = useSearchCandidate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [fiftyMinutesActive, setFiftyMinutesActive] = useState<number>(2);
  const [hours, setHours] = useState<number | undefined>(0);
  const [minutes, setMinutes] = useState<number | undefined>(0);
  const [classes, setClasses] = useState<any>();
  const { getClasses } = useTodayClasses();
  const { deleteClass } = useDeleteClass();
  const [createdClasses, setCreatedClasses] = useState<number>(0);

  useEffect(() => {
    async function fetchClasses() {
      setClasses(await getClasses(new Date(dateString)));
    }
    fetchClasses();
    getTimeLeft(dateString);
  }, []);

  useEffect(() => {
    async function fetchClasses() {
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await delay(1000);
      setClasses(await getClasses(selectedDate));
    }
    fetchClasses();
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Админ Панел
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CalendarIcon className="mr-2" /> Календар
                </h2>
                <Calendar
                  className="max-w-full"
                  aria-label="Date (Controlled)"
                  defaultValue={parseDate(dateString)}
                  minValue={parseDate(dateString)}
                  onChange={(e) => {
                    const date = new Date(e.year, e.month - 1, e.day);
                    setSelectedDate(date);
                    getTimeLeft(date.getTime().toString());
                    getClasses(date).then(setClasses);
                  }}
                />
              </div>

              {/* Classes List */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {selectedDate.toLocaleDateString("bg-BG", {
                      day: "numeric",
                      month: "long",
                    })}
                  </h2>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                    {workingTime}
                  </span>
                </div>
                <div className="divide-y divide-gray-200">
                  {classes && classes.length > 0 ? (
                    classes.map((classItem: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div>
                          <p className="font-medium">
                            {classItem.firstName} {classItem.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {classItem.start} - {classItem.end}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const temp = classes.filter(
                              (_: any, i: number) => i !== index
                            );
                            setClasses(temp);
                            deleteClass(classItem.class_id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-500">
                      Няма часове за този ден
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setIsSearchVisible(true)}
                  className="w-full p-4 bg-green-500 text-white font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <Plus className="mr-2" /> Създай нов час
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* New Class Modal */}
      {isSearchVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Създай нов час</h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="search-candidate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Потърси кандидат
                  </label>
                  <div className="flex">
                    <input
                      id="search-candidate"
                      className="flex-1 p-2 border rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Име на кандидат"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button
                      onClick={() => searchCandidates(name)}
                      className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Време на часа
                  </label>
                  <TimeInput
                    onChange={(e) => {
                      setHours(e?.hour);
                      setMinutes(e?.minute);
                    }}
                    className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Продължителност
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setFiftyMinutesActive(1)}
                      className={`flex-1 py-2 px-4 rounded-md ${
                        fiftyMinutesActive === 1
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      50 мин
                    </button>
                    <button
                      onClick={() => setFiftyMinutesActive(0)}
                      className={`flex-1 py-2 px-4 rounded-md ${
                        fiftyMinutesActive === 0
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      100 мин
                    </button>
                  </div>
                </div>

                {candidates && candidates.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Избери кандидат
                    </label>
                    <div className="max-h-40 overflow-y-auto border rounded-md">
                      {candidates.map((c: Candidate) => (
                        <button
                          key={c._id}
                          onClick={() => setCandidate(c._id)}
                          className={`w-full text-left p-2 hover:bg-gray-100 ${
                            candidate === c._id ? "bg-indigo-100" : ""
                          }`}
                        >
                          {c.firstName} {c.surname} {c.lastName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  const longHour = fiftyMinutesActive ? "50" : "100";
                  signNewClass(
                    candidate,
                    selectedDate,
                    hours,
                    minutes,
                    longHour
                  );
                  setCreatedClasses((prev) => prev + 1);
                  setIsSearchVisible(false);
                  window.location.reload();
                }}
              >
                Запиши
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setIsSearchVisible(false)}
              >
                Отказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
