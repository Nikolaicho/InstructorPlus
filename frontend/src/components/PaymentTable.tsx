"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Trash2, CreditCard } from "lucide-react";
import useDeleteTransaction from "../hooks/Profile/useDeleteTransaction";
import useIsAdmin from "../hooks/Admin/useIsAdmin";

interface PaymentRow {
  event: string;
  date: string;
  id: string;
}

interface PaymentsTableProps {
  transactions: PaymentRow[];
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ transactions }) => {
  const { deleteTransaction } = useDeleteTransaction();
  const [localTransactions, setLocalTransactions] = useState<PaymentRow[]>([]);
  const { isAdmin } = useIsAdmin();

  useEffect(() => {
    if (transactions.length > 0) {
      setLocalTransactions(transactions);
    }
  }, [transactions]);

  const handleDelete = (id: string, index: number) => {
    deleteTransaction(id);
    const updatedTransactions = [...localTransactions];
    updatedTransactions.splice(index, 1);
    setLocalTransactions(updatedTransactions);
  };

  // Calculate total amount
  const totalAmount = localTransactions.reduce((sum, transaction) => {
    const amount = Number.parseFloat(transaction.event);
    return isNaN(amount) ? sum : sum + amount;
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-white mr-2" />
          <h3 className="text-white font-semibold">Плащания</h3>
        </div>

        <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
          Общо: {totalAmount.toFixed(2)} лв.
        </div>
      </div>

      {localTransactions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Няма записани плащания
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {localTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-gray-50 transition-colors relative"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{transaction.event} лв.</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {transaction.date}
                    </span>
                  </div>
                </div>

                {isAdmin ? (
                  <button
                    onClick={() => handleDelete(transaction.id, index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;
