import { useState, useEffect } from "react"

import RentItem from "../items/RentItem"
import TimeSelect from "./TimeSelect"
import Title from "../ui/Title"

import APIRents from "../../services/api/APIRents"
import timeToNowLessTime from "../../utils/timeToNowLessTime"

import type { Rent } from "../../types/Rent"
import type { Time } from "../../types/Time"


export default function RentsHistory() {
    const [ordenedRents, setOrdenedRents] = useState<Rent[]>([])
    const [selectedTime, setSelectedTime] = useState<Time>('1month')

    useEffect(() => {
        const minTime = timeToNowLessTime(selectedTime)

        const filteredAndSorted = [...APIRents.rents]
            .filter(category => category.createdAt >= minTime)
            .sort((a, b) => b.createdAt - a.createdAt)

        setOrdenedRents(filteredAndSorted)
    }, [APIRents.rents, selectedTime])

    return (
        <div className="flex flex-col gap-4">
            <TimeSelect
                setTime={setSelectedTime}
            />
            <div className="bg-gray-100 p-4 flex flex-col gap-2">
                <Title
                    extraStyles="underline text-brand-500"
                    textContent="HISTÓRICO"
                />
                <div className="flex flex-col">
                    {ordenedRents.length > 0 ? (
                        ordenedRents.map((r, i) => (
                            <RentItem
                                setOrdenedRents={setOrdenedRents}
                                rent={r}
                                key={i}
                            />
                        ))
                    ) : (
                        <p
                            className="font-bold text-gray-500
                                bg-gray-200 w-max p-2.5 rounded-2xl mx-auto"
                        >
                            Nenhuma entrada encontrada.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
