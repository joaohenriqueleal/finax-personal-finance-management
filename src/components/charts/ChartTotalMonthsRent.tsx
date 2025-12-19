import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js"

import APIRents from "../../services/api/APIRents"
import formatPrice from "../../utils/formatPrice"
import Title from "../ui/Title"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)

interface Rent {
    createdAt: number
    value: number
}

export default function ChartTotalMonthsRent() {
    const rents: Rent[] = APIRents.rents

    const now = new Date()

    const monthsLabels: string[] = []
    const monthsMap: Record<string, number> = {}

    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = `${date.getFullYear()}-${date.getMonth()}`
        const label = date.toLocaleDateString("pt-BR", {
            month: "short",
            year: "numeric",
        })

        monthsLabels.push(label)
        monthsMap[key] = 0
    }

    rents.forEach((rent) => {
        const date = new Date(rent.createdAt)
        const key = `${date.getFullYear()}-${date.getMonth()}`

        if (key in monthsMap) {
            monthsMap[key] += Number(rent.value)
        }
    })

    const data = {
        labels: monthsLabels,
        datasets: [
            {
                label: "Total de Rendas",
                data: Object.values(monthsMap),
                backgroundColor: "#1DBF73",
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return formatPrice(context.raw as number)
                    },
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
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    callback: (value: number | string) => {
                        return formatPrice(Number(value))
                    },
                },
            },
        },
    }

    return (
        <div
            className="flex flex-col gap-4"
            style={{
                width: "100%",
                height: "300px",
            }}
        >
            <Title
                textContent="Entradas totais últimos 12 Mêses"
                extraStyles="text-xl text-center text-brand-500 font-semibold"
            />
            <Bar data={data} options={options} />
        </div>
    )
}
