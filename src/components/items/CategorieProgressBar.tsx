import { useState, useEffect } from "react"

import formatPrice from "../../utils/formatPrice"
import type { Category } from "../../types/Category"

interface CategorieProgressBarProps {
    totalExpensed: number
    category: Category
}


export default function CategorieProgressBar({ category, totalExpensed } : CategorieProgressBarProps ) {
    const [barColor, setBarColor] = useState<string>('bg-green-500')
    const [barWidth, setBarWidth] = useState<number>(0)

    const computePercentExpensed = () => {
        return totalExpensed / category.monthGoal * 100
    }

    const defineBarColor = () => {
        if (barWidth >= 100) return 'bg-red-600'
        else if (barWidth >= 75) return 'bg-red-500'
        else if (barWidth >= 50) { return 'bg-orange-500' }
        else { return 'bg-green-500' }
    }

    useEffect(() => {
        setBarWidth(computePercentExpensed() <= 100 ? computePercentExpensed() : 100)
    }, [totalExpensed])

    useEffect(() => {
        setBarColor(defineBarColor())
    }, [barWidth])
    
    return (
        <div className="flex flex-col gap-2">
            <h3 className="indent-2 font-semibold">{category.name}</h3>
            <div className="bg-gray-300 rounded-3xl overflow-hidden shadow">
                <div
                    className={`p-3 ${barColor} min-w-18`}
                    style={{width: `${barWidth}%`}}
                >
                    <p className="text-sm text-white font-bold">{barWidth.toFixed(2)}%</p>
                </div>
            </div>
            <div
                className="flex items-center justify-between px-2 text-sm
                    text-gray-600 font-semibold"
            >
                <p>{formatPrice(totalExpensed)}</p>
                <p>{formatPrice(category.monthGoal)}</p>
            </div>
        </div>
    )
}
