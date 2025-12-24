import { useEffect, useState } from "react"

import Title from "../ui/Title"

import formatPrice from "../../utils/formatPrice"
import APIExpenses from "../../services/api/APIExpenses"
import APIRents from "../../services/api/APIRents"

interface UserBalanceProps {
    showBalance: boolean
    extraStyles?: string
}


export default function UserBalance({ showBalance, extraStyles } : UserBalanceProps ) {
    const [balance, setBalance] = useState<number>(0)
    const msPerDay: number = 86_400_000

    const getUserBalance = () : number => {
        let total = 0
        const now: number = Date.now()
        APIRents.rents.forEach((r) => {
            if (r.createdAt >= now - (msPerDay * 30)) total += Number(r.value)
        })
        APIExpenses.expenses.forEach((e) => {
            if (e.createdAt >= now - (msPerDay * 30)) total -= Number(e.value)
        })
        return total
    }

    useEffect(() => {
        setBalance(getUserBalance())
    }, [APIRents.rents, APIExpenses.expenses])

    return (
        <Title
            textContent={showBalance ? formatPrice(balance) :
                '*'.repeat(formatPrice(balance).length)}
            extraStyles={`${extraStyles}
                font-bold ${showBalance && balance < 0 ? 'text-red-600' :
                'text-black'}`}
        />
    )
}
