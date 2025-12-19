import { useState } from "react"

import ChartTotalMonthsRent from "../../charts/ChartTotalMonthsRent"
import RentsHistory from "../../layout/RentsHistory"
import AddRentAppBar from "./AddRentAppBar"
import Button from "../../input/Button"
import TopAppBar from "../TopAppBar"

interface RentAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function RentAppBar({ setShow } : RentAppBarProps ) {
    const [showTABAddRent, setShowTABAddRent] = useState<boolean>(false)

    return (
        <TopAppBar
            setShow={setShow}
            title="Rendas"
        >
            <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                <Button
                    extraStyles="bg-brand-300 p-4 text-white font-bold cursor-pointer
                        shadow-[2px_2px_green] hover:shadow-none hover:bg-brand-200
                        transition duration-300"
                    handleClick={() => setShowTABAddRent(true)}
                    content="Adicionar nova entrada"
                />
                <ChartTotalMonthsRent />
                <RentsHistory />
            </div>
            {showTABAddRent && (
                <AddRentAppBar setShow={setShowTABAddRent} />
            )}
        </TopAppBar>
    )
}
