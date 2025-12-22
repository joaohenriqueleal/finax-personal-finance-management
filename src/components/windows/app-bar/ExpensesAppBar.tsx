import { useEffect, useState } from "react"

import APICategories from "../../../services/api/APICategories"

import ChartTotalMonthsExpense from "../../charts/ChartTotalMonthsExpense"
import ExpensesHistory from "../../layout/ExpensesHistory"
import AddExpenseAppBar from "./AddExpenseAppBar"
import Button from "../../input/Button"
import TopAppBar from "../TopAppBar"
import Message from "../Message"


interface ExpensesAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExpensesAppBar({ setShow } : ExpensesAppBarProps ) {
    const [showTABAddExpense, setShowTABAddExpense] = useState<boolean>(false)
    const [showMessageAEC, setShowMessageAEC] = useState<boolean>(false)
    const [buttonAEAbeled, setButtonAEAbeled] = useState<boolean>(false)

    useEffect(() => {
        if (APICategories.categories.length > 0) {
            setButtonAEAbeled(true)
        }
    }, [])

    const showTABAE = () => {
        if (buttonAEAbeled) {
            setShowTABAddExpense(true)
        } else {
            setShowMessageAEC(true)
        }
    }
    
    return (
        <TopAppBar
            setShow={setShow}
            title="Despesas"
        >
            <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                <Button
                    extraStyles={`${buttonAEAbeled ? 'bg-brand-300' : 'bg-gray-600'}
                        p-4 text-white font-bold cursor-pointer ${buttonAEAbeled ? 'shadow-[2px_2px_green]' : 'shadow-[2px_2px_black]'}
                        hover:shadow-none ${buttonAEAbeled ? 'hover:bg-brand-200' : ''}
                        transition duration-300`}
                    handleClick={showTABAE}
                    content="Adicionar saída"
                />
                <ChartTotalMonthsExpense />
                <ExpensesHistory />
            </div>
            {showTABAddExpense && (
                <AddExpenseAppBar
                    setShow={setShowTABAddExpense}
                />
            )}
            {showMessageAEC && (
                <Message
                    setShow={setShowMessageAEC}
                    message="Não há nenhuma categoria cadastrada!"
                />
            )}
        </TopAppBar>
    )
}
