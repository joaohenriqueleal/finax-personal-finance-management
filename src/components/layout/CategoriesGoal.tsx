import CategorieProgressBar from "../items/CategorieProgressBar"
import Title from "../ui/Title"

import APICategories from "../../services/api/APICategories"
import APIExpenses from "../../services/api/APIExpenses"

import timeToNowLessTime from "../../utils/timeToNowLessTime"

export default function CategoriesGoal() {
    const getTotalExpensed = (categoryName: string): number => {
        const oneMonthAgo = timeToNowLessTime("1month")

        return APIExpenses.expenses.reduce((total, expense) => {
            const isSameCategory = expense.category === categoryName
            const isThisMonth = expense.createdAt >= oneMonthAgo

            if (isSameCategory && isThisMonth) {
                return total + Number(expense.value)
            }

            return total
        }, 0)
    }

    return (
        <div className="flex flex-col gap-8 bg-gray-100 p-8 shadow">
            <Title
                textContent="Progresso das suas metas"
                extraStyles="text-center"
            />

            <div className="flex flex-col gap-6">
                {APICategories.categories.length > 0 ? (
                    APICategories.categories.map((category, index) => (
                        <CategorieProgressBar
                            key={index}
                            category={category}
                            totalExpensed={getTotalExpensed(category.name)}
                        />
                    ))
                ) : (
                    <p
                        className="
                            text-center text-gray-600 w-max p-2
                            bg-gray-100 m-auto rounded-3xl px-4
                        "
                    >
                        Nenhuma categoria cadastrada.
                    </p>
                )}
            </div>
        </div>
    )
}
