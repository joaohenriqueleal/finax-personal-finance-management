import { useState } from "react"

import type { APIResponse } from "../../../types/APIResponse"
import APIExpenses from "../../../services/api/APIExpenses"

import Message from "../../windows/Message"
import Button from "../Button"

interface ButtonAddExpenseProps {
    expenseDescription: string
    selectedCategory: string
    expenseValue: number
}


export default function ButtonAddExpense(
    {  expenseDescription, selectedCategory, expenseValue } : ButtonAddExpenseProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')
    
    const addExpense = () => {
        const response: APIResponse = APIExpenses.addExpense(
            expenseDescription,
            selectedCategory,
            expenseValue
        )

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                handleClick={addExpense}
                extraStyles="p-4 self-end bg-brand-300 text-white font-bold w-full
                    shadow-[2px_2px_green] hover:bg-brand-200 hover:shadow-none
                    transition duration-300 cursor-pointer"
                content="Adicionar"
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
