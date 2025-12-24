import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"

import { useMemo } from "react"
import useIsSmallScreen from "../../hooks/useIsSmallScreen"

import APIExpenses from "../../services/api/APIExpenses"

import formatTimestampDMY from "../../utils/formatTimestampDMY"
import formatPrice from "../../utils/formatPrice"
import type { Time } from "../../types/Time"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)

interface ChartExpensesPerTimeProps {
    selectedTime: Time
}

const PERIOD_CONFIG: Record<Exclude<Time, "all">, {
    label: string
    ms: number
}> = {
    "1day": { label: "Dia", ms: 86_400_000 },
    "1week": { label: "Semana", ms: 86_400_000 * 7 },
    "1month": { label: "Mês", ms: 86_400_000 * 30 },
    "1year": { label: "Ano", ms: 86_400_000 * 365 },
}

export default function ChartExpensesPerTime({
    selectedTime
}: ChartExpensesPerTimeProps) {

    if (selectedTime === "all") {
        return (
            <div
                className="text-center text-gray-500 font-bold p-2 m-2 mt-4
                bg-gray-200 w-max rounded mx-auto"
            >
                Dados insuficientes
            </div>
        )
    }

    const isSmallScreen = useIsSmallScreen()
    const periodCount = isSmallScreen ? 6 : 12

    const { ms } = PERIOD_CONFIG[selectedTime]
    const now = Date.now()

    const { labels, expenses } = useMemo(() => {
        const labels: string[] = []
        const expenses: number[] = []

        for (let i = periodCount - 1; i >= 0; i--) {
            const periodEnd = now - (i * ms)
            const periodStart = periodEnd - ms

            let totalExpenses = 0

            APIExpenses.expenses.forEach(e => {
                if (e.createdAt >= periodStart && e.createdAt < periodEnd) {
                    totalExpenses += Number(e.value)
                }
            })

            labels.push(formatTimestampDMY(periodEnd))
            expenses.push(totalExpenses)
        }

        return { labels, expenses }
    }, [selectedTime, periodCount])

    const hasAnyData = expenses.some(v => v !== 0)

    if (!hasAnyData) {
        return (
            <div
                className="text-center text-gray-500 font-bold p-2 m-2 mt-4
                bg-gray-200 w-max rounded mx-auto"
            >
                Dados insuficientes
            </div>
        )
    }

    const data = {
        labels,
        datasets: [
            {
                data: expenses,
                backgroundColor: "rgba(239,68,68,0.6)",
                borderRadius: 6,
                barThickness: isSmallScreen ? 22 : 18,
            }
        ]
    }

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) =>
                        formatPrice(Number(ctx.parsed.y))
                }
            }
        },
        scales: {
            x: {
                grid: { display: false }
            },
            y: {
                grid: { display: false },
                ticks: {
                    callback: (value) =>
                        formatPrice(Number(value))
                }
            }
        }
    }

    return (
        <div className="h-72 bg-white rounded-2xl p-4 shadow-sm">
            <Bar data={data} options={options} />
        </div>
    )
}
