"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import useAddDocument from "../hooks/Documents/useAddDocument";
import useAddCar from "../hooks/Documents/useAddCar";
import useGetAllDocuments from "../hooks/Documents/useGetAllDocuments";
import useDeleteDocument from "../hooks/Documents/useDeleteDocument";
import useCreateInstructor from "../hooks/Documents/useCreateInstructor";
import PopUpAdd from "./PopUpAdd";
import PopUpDelete from "./PopUpDelete";
import PopUpDocument from "./PopUpDocument";
import { Trash2 } from "lucide-react";
import useDeleteInstructor from "../hooks/Documents/useDeleteInstructor";
import useDeleteCar from "../hooks/Documents/useDeleteCar";

function Documents() {
  const [activeButton, setActiveButton] = useState<number>(0);
  const { addDocument } = useAddDocument();
  const { documents, setDocuments } = useGetAllDocuments();
  const { deleteDocument } = useDeleteDocument();
  const { createInstructor } = useCreateInstructor();
  const { addCar, errorMessage } = useAddCar();
  const { deleteInstructor } = useDeleteInstructor();
  const { deleteCar } = useDeleteCar();

  const deleteClassFromUI = (index: number) => {
    if (documents != undefined) {
      const docs = [...documents];
      docs.splice(index, 1);
      setDocuments(docs);
    }
  };

  const buttons = [
    { id: 1, text: "Повиши към инструктор" },
    { id: 2, text: "Премахни инструктор" },
    { id: 3, text: "Добави кола" },
    { id: 4, text: "Премахни кола" },
    { id: 5, text: "Създай документ" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Документи</h1>
            <div className="flex flex-wrap gap-4">
              {buttons.map((button) => (
                <motion.button
                  key={button.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setActiveButton(button.id)}
                >
                  {button.text}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {documents?.map((document: any, index: number) => (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div
                  className={`p-2 text-center text-white font-semibold ${
                    document.mark === "Безопасно"
                      ? "bg-green-500"
                      : document.mark === "Опасно"
                      ? "bg-orange-500"
                      : document.mark === "Критично"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {document.mark}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {document.name}
                  </h3>
                  <p className="text-gray-600 mb-1">{document.relatedTo}</p>
                  <p className="text-gray-500 text-sm">{document.date}</p>
                  <button
                    onClick={() => {
                      deleteDocument(document.id);
                      deleteClassFromUI(index);
                    }}
                    className="mt-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {activeButton === 1 && (
          <PopUpAdd
            rows={["Потребителско ID"]}
            submitFunc={createInstructor}
            jsonFields={["id"]}
            setButton={setActiveButton}
          />
        )}
        {activeButton === 2 && (
          <PopUpDelete
            type="person"
            submitFunc={deleteInstructor}
            jsonFields={["id"]}
            setButton={setActiveButton}
          />
        )}
        {activeButton === 3 && (
          <PopUpAdd
            rows={["Марка", "Модел", "Рег.номер"]}
            submitFunc={addCar}
            jsonFields={["brand", "model", "registration"]}
            setButton={setActiveButton}
          />
        )}
        {activeButton === 4 && (
          <PopUpDelete
            type="car"
            submitFunc={deleteCar}
            jsonFields={["registration"]}
            setButton={setActiveButton}
          />
        )}
        {activeButton === 5 && (
          <PopUpDocument
            rows={["Документ"]}
            submitFunc={addDocument}
            jsonFields={["documentName", "relatedTo", "date"]}
            setButton={setActiveButton}
          />
        )}
      </div>
    </div>
  );
}

export default Documents;
