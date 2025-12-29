import { Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

import APICategories from "../../services/api/APICategories"
import APIExpenses from "../../services/api/APIExpenses"

import timeToNowLessTime from "../../utils/timeToNowLessTime"
import formatPrice from "../../utils/formatPrice"
import { colorFromString, darkenColor } from "../../utils/colorFromString"

import type { Time } from "../../types/Time"

ChartJS.register(ArcElement, Tooltip, Legend)

interface ChartPieExpensesPerCategoryProps {
    selectedTime: Time
}

export default function ChartPieExpensesPerCategory({
    selectedTime,
}: ChartPieExpensesPerCategoryProps) {
    const minDate =
        selectedTime === "all" ? 0 : timeToNowLessTime(selectedTime)

    const filteredExpenses = APIExpenses.expenses.filter(
        expense => expense.createdAt >= minDate
    )

    const expensesPerCategory = APICategories.categories
        .map(category => {
            const total = filteredExpenses
                .filter(exp => exp.category === category.name)
                .reduce((acc, exp) => acc + exp.value, 0)

            return {
                name: category.name,
                total,
            }
        })
        .filter(c => c.total > 0)

    if (expensesPerCategory.length === 0) {
        return (
            <div className="text-center text-gray-500 font-bold p-2 m-2 mt-4
                bg-gray-200 w-max rounded mx-auto">
                não há dados para o período selecionado
            </div>
        )
    }

    const backgroundColors = expensesPerCategory.map(c =>
        colorFromString(c.name)
    )

    const borderColors = backgroundColors.map(color =>
        darkenColor(color)
    )

    const data = {
        labels: expensesPerCategory.map(c => c.name),
        datasets: [
            {
                data: expensesPerCategory.map(c => c.total),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 3,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right" as const,
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const index = context.dataIndex
                        const category = expensesPerCategory[index]

                        return `${category.name}: ${formatPrice(
                            category.total
                        )}`
                    },
                },
            },
            datalabels: {
                color: "#fff",
                anchor: "center" as const,
                align: "center" as const,
                clamp: true,
                font: {
                    weight: 700,
                    size: 11,
                },
                formatter: (value: number) => formatPrice(value),
            },
        },
    }

    return (
        <div className="w-full max-w-[360px] h-[260px] mx-auto bg-white
            rounded-2xl p-6 shadow-sm border border-gray-200">
            <Pie
                data={data}
                options={options}
                plugins={[ChartDataLabels]}
            />
        </div>
    )
}
