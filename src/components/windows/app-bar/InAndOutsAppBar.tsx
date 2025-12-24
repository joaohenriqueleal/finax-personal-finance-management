import { useState } from "react"


import ChartExpensesPerTime from "../../charts/ChartExpensesPerTime"
import ChartBalancePerTime from "../../charts/ChartBalancePerTime"
import ChartRentsPerTime from "../../charts/ChartRentsPerTime"
import TimeSelect from "../../layout/TimeSelect"
import TopAppBar from "../TopAppBar"

import APIExpenses from "../../../services/api/APIExpenses"
import APIRents from "../../../services/api/APIRents"

import timeToNowLessTime from "../../../utils/timeToNowLessTime"
import formatPrice from "../../../utils/formatPrice"

import type { Time } from "../../../types/Time"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

interface InAndOutsAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function InAndOutsAppBar({ setShow }: InAndOutsAppBarProps) {
    const [selectedTime, setSelectedTime] = useState<Time>("1month")


    const getUserBalanceInSelectedTime = () : number => {
        let total = 0
        APIRents.rents.forEach((r) => {
            if (r.createdAt >= timeToNowLessTime(selectedTime)) total += Number(r.value)
        })
        APIExpenses.expenses.forEach((e) => {
            if (e.createdAt >= timeToNowLessTime(selectedTime)) total -= Number(e.value)
        })
        return total
    }

    const getUserExpensesInSelectedTime = () : number => {
        let totalExpenses = 0
        APIExpenses.expenses.map((e) => {
            if (e.createdAt > timeToNowLessTime(selectedTime)) totalExpenses += Number(e.value)
        })
        return totalExpenses
    }

    const getUserRentsInSelectedTime = () => {
        let totalRents = 0
        APIRents.rents.forEach((r) => {
            if (r.createdAt > timeToNowLessTime(selectedTime)) totalRents += Number(r.value)
        })
        return totalRents
    }

    const balance = getUserBalanceInSelectedTime()
    const expenses = getUserExpensesInSelectedTime()
    const rents = getUserRentsInSelectedTime()

    return (
        <TopAppBar setShow={setShow} title="Entradas e saídas">
            <div className="max-w-4xl mx-auto px-4 flex flex-col gap-8 text-black">
                <TimeSelect setTime={setSelectedTime} />
                <div className="shadow-sm p-6 flex flex-col gap-2 bg-gray-100">
                    <span className="text-sm font-medium text-gray-500">
                        Saldo total
                    </span>

                    <span
                        className={`text-3xl font-bold ${
                            balance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {formatPrice(balance)}
                    </span>

                    <span className="text-xs text-gray-400">
                        Período selecionado
                    </span>
                        <ChartBalancePerTime
                            selectedTime={selectedTime}
                        />
                </div>
                <div className="bg-gray-100 shadow-sm p-6 flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-500">
                        Entradas
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                            {formatPrice(rents)}
                        </span>

                        <FaCaretUp className="text-green-500 opacity-70" size={20} />
                    </div>

                    <span className="text-xs text-gray-400">
                        Total de entrdas no período
                    </span>
                    <ChartRentsPerTime
                        selectedTime={selectedTime}
                    />
                </div>
                <div className="bg-gray-100 shadow-sm p-6 flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-500">
                        Saídas
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-red-600">
                            {formatPrice(expenses)}
                        </span>

                        <FaCaretDown className="text-red-500 opacity-70" size={20} />
                    </div>

                    <span className="text-xs text-gray-400">
                        Total gasto no período
                    </span>
                    <ChartExpensesPerTime
                        selectedTime={selectedTime}
                    />
                </div>
            </div>
        </TopAppBar>
    )
}
