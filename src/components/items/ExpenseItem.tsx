import ButtonDeleteExpense from "../input/buttons/ButtonDeleteExpense"

import getExactDate from "../../utils/getExactDate"
import formatPrice from "../../utils/formatPrice"

import type { Expense } from "../../types/Expense"

interface ExpenseItemProps {
    setOrdenedExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
    expense: Expense
}


export default function ExpenseItem({ setOrdenedExpenses, expense } : ExpenseItemProps ) {
    return (
        <div className="p-4 bg-gray-300 flex border-b-2 border-gray-400">
            <div className="w-1/2 flex flex-col gap-2">
                <p className="font-bold">{formatPrice(expense.value)}</p>
                <p className="text-gray-600">{expense.description}</p>
            </div>
            <div className="w-1/2 flex flex-col justify-between items-end">
                <p className="text-sm font-bold tracking-wide">
                    {getExactDate(expense.createdAt)}
                </p>
                <ButtonDeleteExpense
                    setOrdenedExpenses={setOrdenedExpenses}
                    expense={expense}
                />
            </div>
        </div>
    )
}
