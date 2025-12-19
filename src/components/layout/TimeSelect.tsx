import type { Time } from "../../types/Time"
import { useState } from "react"

interface TimeSelectProps {
    setTime: React.Dispatch<React.SetStateAction<Time>>
}

const options: { label: string; value: Time }[] = [
    { label: "1d", value: "1day" },
    { label: "7d", value: "1week" },
    { label: "30d", value: "1month" },
    { label: "1ano", value: "1year" },
    { label: "todo", value: "all" },
]

export default function TimeSelect({ setTime }: TimeSelectProps) {
    const [selected, setSelected] = useState<Time>("1month")

    function handleSelect(value: Time) {
        setSelected(value)
        setTime(value)
    }

    return (
        <div className="flex items-center justify-center gap-2 bg-gray-100 p-2 text-lg">
            {options.map(({ label, value }) => {
                const isActive = selected === value

                return (
                    <button
                        key={value}
                        onClick={() => handleSelect(value)}
                        className={`
                            relative min-w-15 px-2 py-1 font-bold cursor-pointer
                            transition-colors
                            ${isActive ? "text-brand-200" : "text-gray-600 hover:text-gray-700"}
                        `}
                    >
                        {label}
                        <span
                            className={`
                                absolute left-0 -bottom-0.5 h-0.5 w-full
                                bg-brand-200
                                origin-left
                                transition-transform duration-300
                                ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                            `}
                        />
                    </button>
                )
            })}
        </div>
    )
}
