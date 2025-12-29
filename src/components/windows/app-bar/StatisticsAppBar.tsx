import { useState } from "react"

import ChartPieExpensesPerCategory from "../../charts/ChartPieExpensesPerCategory"
import MostExpensiveCategory from "../../layout/MostExpensiveCategory"
import DayExpenseMean from "../../layout/DayExpenseMean"
import TimeSelect from "../../layout/TimeSelect"
import TopAppBar from "../TopAppBar"
import Title from "../../ui/Title"

import type { Time } from "../../../types/Time"

interface StatisticsAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function StatisticsAppBar({ setShow } : StatisticsAppBarProps) {
    const [selectedTime, setSelectedTime] = useState<Time>('1month')
    
    return (
        <TopAppBar
            title="Estatísticas"
            setShow={setShow}
        >
            <div
                className="w-full max-w-4xl mx-auto px-4 flex flex-col
                    gap-10 text-black"
            >
                <TimeSelect setTime={setSelectedTime} />
                <div className="
                    w-full bg-gray-50 rounded-2xl p-6
                    flex flex-col gap-6 items-center"
                >
                    <Title
                        extraStyles="
                            text-sm font-semibold tracking-wide text-brand-500/80
                            uppercase"
                        textContent="Gastos por categoria"
                    />

                    <ChartPieExpensesPerCategory selectedTime={selectedTime} />
                    <MostExpensiveCategory selectedTime={selectedTime} />
                    <DayExpenseMean selectedTime={selectedTime} />
                </div>
            </div>
        </TopAppBar>
    )
}
