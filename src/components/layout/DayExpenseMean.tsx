import APIExpenses from "../../services/api/APIExpenses"

import formatPrice from "../../utils/formatPrice"
import timeToNowLessTime from "../../utils/timeToNowLessTime"

import type { Time } from "../../types/Time"
import Title from "../ui/Title"

interface DayExpenseMeanProps {
    selectedTime: Time
}

export default function DayExpenseMean({ selectedTime }: DayExpenseMeanProps) {

    const getMeanExpenses = (): number => {
        const now = Date.now()
        const startTime = timeToNowLessTime(selectedTime)

        const expensesInPeriod = APIExpenses.expenses.filter(
            e => e.createdAt >= startTime
        )

        if (expensesInPeriod.length === 0) return 0

        const total = expensesInPeriod.reduce(
            (sum, e) => sum + e.value,
            0
        )

        let days = 1
        const msPerDay = 86_400_000

        if (selectedTime === 'all') {
            const oldestExpense = Math.min(
                ...APIExpenses.expenses.map(e => e.createdAt)
            )
            days = Math.max(
                1,
                Math.ceil((now - oldestExpense) / msPerDay)
            )
        } else {
            days = Math.max(
                1,
                Math.ceil((now - startTime) / msPerDay)
            )
        }

        return total / days
    }

    const mean = getMeanExpenses()

    return (
        <>
            {mean ? (
                <div className="w-full bg-gray-100 p-4">
                    <div className="w-full">
                        <p className="text-sm font-bold text-brand-500">
                            Média de gastos por dia
                        </p>
                        <Title
                            extraStyles="py-4 text-brand-500"
                            textContent={formatPrice(mean)}
                        />
                    </div>
                </div>
            ) : (<></>)}
        </>
    )
}
