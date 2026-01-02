import { useState } from "react"

import { FaChevronRight } from "react-icons/fa"
import { FaVault } from "react-icons/fa6"

import AddVaultAppBar from "../windows/app-bar/AddVaultAppBar"
import VaultsBoard from "../layout/VaultsBoard"


export default function SectionReserves() {
    const [showAddVaultAppBar, setShowAddVaultAppBar] = useState<boolean>(false)
    
    return (
        <section className="flex flex-col p-4 gap-4">
            <button
                className="w-full flex items-center justify-between p-4 bg-gray-100/70
                    rounded-xl hover:bg-gray-100 cursor-pointer transition
                    duration-300 text-gray-700"
                onClick={() => setShowAddVaultAppBar(true)}
            >
                <FaVault size={24} />
                <FaChevronRight />
            </button>
            <VaultsBoard />
            {showAddVaultAppBar && (
                <AddVaultAppBar
                    setShow={setShowAddVaultAppBar}
                />
            )}
        </section>
    )
}
