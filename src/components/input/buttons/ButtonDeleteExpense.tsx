import { useState } from "react"

import { FaTrash } from "react-icons/fa"

import Message from "../../windows/Message"
import Button from "../Button"

import APIExpenses from "../../../services/api/APIExpenses"
import type { APIResponse } from "../../../types/APIResponse"
import type { Expense } from "../../../types/Expense"

interface ButtonDeleteExpenseProps {
    setOrdenedExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
    expense: Expense
}

export default function ButtonDeleteExpense({
    expense,
    setOrdenedExpenses,
}: ButtonDeleteExpenseProps) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>("")

    const deleteExpense = () => {
        const response: APIResponse = APIExpenses.deleteExpense(expense.createdAt)

        setMessageToShow(response.error || response.success || "")
        setShowMessage(true)
        setOrdenedExpenses(APIExpenses.expenses)
    }

    return (
        <>
            <Button
                extraStyles="bg-red-200/70 p-2 text-white rounded hover:bg-red-400
                    cursor-pointer transition duration-300 shadow"
                handleClick={deleteExpense}
                content={<FaTrash />}
            />

            {showMessage && (
                <Message
                    setShow={setShowMessage}
                    message={messageToShow}
                />
            )}
        </>
    )
}
