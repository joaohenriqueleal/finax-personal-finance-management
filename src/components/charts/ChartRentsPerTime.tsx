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

import APIRents from "../../services/api/APIRents"

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

interface ChartRentsPerTimeProps {
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


export default function ChartRentsPerTime({
    selectedTime
}: ChartRentsPerTimeProps) {

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

    const { labels, rents } = useMemo(() => {
        const labels: string[] = []
        const rents: number[] = []

        for (let i = periodCount - 1; i >= 0; i--) {
            const periodEnd = now - (i * ms)
            const periodStart = periodEnd - ms

            let totalRents = 0

            APIRents.rents.forEach(r => {
                if (r.createdAt >= periodStart && r.createdAt < periodEnd) {
                    totalRents += Number(r.value)
                }
            })

            labels.push(formatTimestampDMY(periodEnd))
            rents.push(totalRents)
        }

        return { labels, rents }
    }, [selectedTime, periodCount])

    const hasAnyData = rents.some(v => v !== 0)

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
                data: rents,
                backgroundColor: "rgba(34,197,94,0.6)",
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
