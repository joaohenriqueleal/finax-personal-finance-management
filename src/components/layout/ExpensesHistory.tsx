import { useState, useEffect } from "react"

import ExpenseItem from "../items/ExpenseItem"
import TimeSelect from "./TimeSelect"
import Title from "../ui/Title"

import timeToNowLessTime from "../../utils/timeToNowLessTime"
import APIExpenses from "../../services/api/APIExpenses"

import type { Expense } from "../../types/Expense"
import type { Time } from "../../types/Time"


export default function ExpensesHistory() {
    const [ordenedExpenses, setOrdenedExpenses] = useState<Expense[]>([])
    const [selectedTime, setSelectedTime] = useState<Time>("1month")

    useEffect(() => {
        const minTime = timeToNowLessTime(selectedTime)

        const filteredAndSorted = [...APIExpenses.expenses]
            .filter(expense => expense.createdAt >= minTime)
            .sort((a, b) => b.createdAt - a.createdAt)

        setOrdenedExpenses(filteredAndSorted)
    }, [APIExpenses.expenses, selectedTime])

    return (
        <div className="flex flex-col gap-4">
            <TimeSelect
                setTime={setSelectedTime}
            />
            <div className="bg-gray-100 p-4 flex flex-col gap-2">
                <Title
                    extraStyles="underline text-brand-500"
                    textContent="HISTÓRICO"
                />
                <div className="flex flex-col">
                    {ordenedExpenses.length > 0 ? (
                        ordenedExpenses.map((expense, i) => (
                            <ExpenseItem
                                setOrdenedExpenses={setOrdenedExpenses}
                                expense={expense}
                                key={i}
                            />
                        ))
                    ) : (
                        <p
                            className="font-bold text-gray-500
                                bg-gray-200 w-max p-2.5 rounded-2xl mx-auto"
                        >
                            Nenhuma saída encontrada.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
