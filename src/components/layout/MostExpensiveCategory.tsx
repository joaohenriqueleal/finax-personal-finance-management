import APICategories from "../../services/api/APICategories"
import APIExpenses from "../../services/api/APIExpenses"

import timeToNowLessTime from "../../utils/timeToNowLessTime"
import type { Time } from "../../types/Time"

interface MostExpensiveCategoryProps {
    selectedTime: Time
}


export default function MostExpensiveCategory({ selectedTime } : MostExpensiveCategoryProps ) {
    const getMostExpensiveCategoryName = (): string => {
        const categoriesTotalExpenses: { name: string; total: number }[] = []

        APICategories.categories.forEach((c) => {
            let total = 0

            APIExpenses.expenses.forEach((e) => {
                if (
                    e.category.toLowerCase() === c.name.toLowerCase() &&
                    e.createdAt >= timeToNowLessTime(selectedTime)
                ) {
                    total += e.value
                }
            })

            categoriesTotalExpenses.push({ name: c.name, total })
        })

        let mostExpensiveCategory = { name: '', total: 0 }

        categoriesTotalExpenses.forEach((c) => {
            if (c.total > mostExpensiveCategory.total) {
                mostExpensiveCategory = c
            }
        })

        return mostExpensiveCategory.name
    }

    return (
        <>
            {getMostExpensiveCategoryName() ? (
                <div
                    className="w-full p-5 bg-gray-100 flex flex-col gap-2"
                >
                    <p className="font-bold text-sm">Categoria Vilâ do período:</p>
                    <p className="tracking-wide text-red-700">
                        {getMostExpensiveCategoryName()}
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}
