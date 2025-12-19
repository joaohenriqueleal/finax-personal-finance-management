import ButtonDeleteRent from "../input/buttons/ButtonDeleteRent"

import formatPrice from "../../utils/formatPrice"
import getExactDate from "../../utils/getExactDate"

import type { Rent } from "../../types/Rent"

interface RentItemProps {
    setOrdenedRents: React.Dispatch<React.SetStateAction<Rent[]>>
    rent: Rent
}


export default function RentItem({ rent, setOrdenedRents } : RentItemProps ) {
    return (
        <div className="p-4 bg-gray-300 flex border-b-2 border-gray-400">
            <div className="w-1/2 flex flex-col gap-2">
                <p className="font-bold">{formatPrice(rent.value)}</p>
                <p className="text-gray-600">{rent.description}</p>
            </div>
            <div className="w-1/2 flex flex-col justify-between items-end">
                <p className="text-sm font-bold tracking-wide">
                    {getExactDate(rent.createdAt)}
                </p>
                <ButtonDeleteRent
                    setOrdenedRents={setOrdenedRents}
                    rent={rent}
                />
            </div>
        </div>
    )
}
