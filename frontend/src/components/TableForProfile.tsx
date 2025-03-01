import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteTransaction from "../hooks/Profile/useDeleteTransaction";
import { useEffect, useState } from "react";
import useDeleteExams from "../hooks/Profile/useDeleteExams";

interface TableForEventsProps {
  title: string;
  rows: [
    { event: string; date: string; result: string | undefined; id: string }
  ];
  isPayments: boolean;
}

const TableForEvents: React.FC<TableForEventsProps> = ({
  title,
  rows,
  isPayments,
}) => {
  const { deleteTransaction } = useDeleteTransaction();
  const { deleteExam } = useDeleteExams();

  const deleteElementFromUI = (rows: any, key: any) => {
    const tuncherAli = [...rows];
    tuncherAli.splice(key, 1);
    setLocalRows(tuncherAli);
  };
  const [localRows, setLocalRows] = useState<any>([]);

  useEffect(() => {
    if (rows.length > 0) {
      setLocalRows(rows);
    }
  }, [rows]);

  return (
    <>
      <div className="w-[60%] relative left-1/2 transform -translate-x-1/2  ">
        <div className="title bg-gray-300 border-1 border-black text-center mt-10">
          {title}
        </div>
        {localRows.map((rowInfo: any, key: any) => (
          <div>
            <div className="text-center border-r border-l border-b border-black text-sm py-2 relative">
              {rowInfo.event} на {rowInfo.date} {rowInfo.result}
              {!isPayments ? (
                <div
                  className="absolute top-[5px] right-[5px] cursor-pointer"
                  onClick={() => {
                    deleteExam(rowInfo.id);
                    deleteElementFromUI(localRows, key);
                  }}
                >
                  <DeleteIcon />
                </div>
              ) : (
                <></>
              )}
              {isPayments ? (
                <div
                  className="absolute top-[5px] right-[5px] cursor-pointer"
                  onClick={() => {
                    deleteTransaction(rowInfo.id);
                    deleteElementFromUI(localRows, key);
                  }}
                >
                  <DeleteIcon />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default TableForEvents;
