import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js"
import type { ChartOptions } from "chart.js"
import { Bar } from "react-chartjs-2"

import { useMemo } from "react"

import APIExpenses from "../../services/api/APIExpenses"
import APIRents from "../../services/api/APIRents"

import useIsSmallScreen from "../../hooks/useIsSmallScreen"

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

interface ChartBalancePerTimeProps {
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


export default function ChartBalancePerTime({
    selectedTime
}: ChartBalancePerTimeProps) {

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

    const { labels, balances } = useMemo(() => {
        const labels: string[] = []
        const balances: number[] = []

        for (let i = periodCount - 1; i >= 0; i--) {
            const periodEnd = now - (i * ms)
            const periodStart = periodEnd - ms

            let balance = 0

            APIRents.rents.forEach(r => {
                if (r.createdAt >= periodStart && r.createdAt < periodEnd) {
                    balance += Number(r.value)
                }
            })

            APIExpenses.expenses.forEach(e => {
                if (e.createdAt >= periodStart && e.createdAt < periodEnd) {
                    balance -= Number(e.value)
                }
            })

            labels.push(formatTimestampDMY(periodEnd))
            balances.push(balance)
        }

        return { labels, balances }
    }, [selectedTime, periodCount])

    const hasAnyData = balances.some(v => v !== 0)

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
                data: balances,
                backgroundColor: balances.map(v =>
                    v >= 0
                        ? "rgba(34,197,94,0.6)"
                        : "rgba(239,68,68,0.6)"
                ),
                borderRadius: 6,
                barThickness: isSmallScreen ? 22 : 18,
            }
        ]
    }
    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (ctx) => formatPrice(Number(ctx.parsed.y)),
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    callback: (value) => formatPrice(Number(value)),
                },
            },
        },
    }

    return (
        <div className="h-72 bg-white rounded-2xl p-4 shadow-sm">
            <Bar data={data} options={options} />
        </div>
    )
}
