import { useState } from "react"

import UserBalance from "../layout/UserBalance"
import TopAppBar from "../windows/TopAppBar"
import Title from "../ui/Title"

import { FaChevronRight } from "react-icons/fa"

interface SectionBalanceProps {
    showBalance: boolean
}


export default function SectionBalance({ showBalance } : SectionBalanceProps ) {
    const [showTABBalances, setShowTABBalances] = useState<boolean>(false)

    return (
        <>
            <section
                className="flex flex-col gap-4 hover:bg-gray-100 p-4 rounded-2xl
                    cursor-pointer transition duration-300"
                onClick={() => setShowTABBalances(true)}
            >
                <div className="flex items-center justify-between">
                    <Title
                        extraStyles="text-xl font-bold"
                        textContent="Saldo"
                    />
                    <FaChevronRight
                        className="text-gray-500"
                    />
                </div>
                <UserBalance
                    showBalance={showBalance}
                />
            </section>
            {showTABBalances && (
                <TopAppBar
                    setShow={setShowTABBalances}
                    title="Entradas e saídas"
                >
                    <div className="text-black max-w-4xl m-auto">

                    </div>
                </TopAppBar>
            )}
        </>
    )
}
