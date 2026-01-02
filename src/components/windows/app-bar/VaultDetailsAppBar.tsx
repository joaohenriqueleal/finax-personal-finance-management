import { useState } from "react"

import RendeemMoneyAppBar from "./RendeemMoneyAppBar"
import SaveMoneyAppBar from "./SaveMoneyAppBar"
import TopAppBar from "../TopAppBar"
import Title from "../../ui/Title"
import Img from "../../ui/Img"

import CashImage from '../../../assets/imgs/cash.jpg'
import formatPrice from "../../../utils/formatPrice"
import type { Vault } from "../../../types/Vault"

import { FaArrowDown, FaArrowUp } from "react-icons/fa"

interface VaultDatailsAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    vault: Vault
}


export default function VaultDatailsAppBar({ setShow, vault } : VaultDatailsAppBarProps ) {
    const [showRedeemMoneyAppBar, setShowRedeemMoneyAppBar] = useState<boolean>(false)
    const [showSaveMoneyAppBar, setShowSaveMoneyAppBar] = useState<boolean>(false)
    
    return (
        <TopAppBar
            title="Detalhes do cofre"
            setShow={setShow}
        >
            <div
                className="flex flex-col text-black max-w-3xl mx-auto bg-gray-100/70cofre de porquinho
                Ferrari
                
                R$ 29.990,00
                    rounded-xl shadow mb-1"
            >
                <Img
                    extraStyles="w-full h-max max-h-100 bh-60 rounded-xl shadow-xl"
                    alt="Cofre de porquinho"
                    src={CashImage}
                />
                <div className="flex flex-col gap-8 p-6">
                    <div className="flex flex-col gap-2">
                        <Title
                            textContent={formatPrice(vault.balance)}
                            extraStyles="text-brand-500 text-4xl"
                        />
                        <Title
                            textContent={formatPrice(vault.goal)}
                            extraStyles="text-gray-900 font-bold text-xl"
                        />
                    </div>
                    <div>
                        <Title
                            extraStyles="text-gray-800 font-bold"
                            textContent={vault.name}
                        />
                        <hr className="text-gray-700 rounded-full border-2" />
                        <p className="py-2 text-gray-600 text-sm">
                            {vault.description}
                        </p>
                    </div>
                    <div
                        className="flex items-center justify-between w-full
                            text-xl"
                    >
                        <button
                            className="flex gap-2 items-center p-4 bg-brand-500 w-35 justify-center
                                text-white font-bold rounded-4xl hover:bg-brand-300
                                transition duration-300 cursor-pointer shadow-md"
                            onClick={() => setShowSaveMoneyAppBar(true)}
                        >
                            Guardar <FaArrowDown />
                        </button>
                        <button
                            className="flex gap-2 items-center p-4 bg-gray-900 justify-center
                                text-white font-bold rounded-4xl hover:bg-gray-600
                                transition duration-300 cursor-pointer shadow-md w-35"
                            onClick={() => setShowRedeemMoneyAppBar(true)}
                        >
                            Retirar <FaArrowUp />
                        </button>
                    </div>
                </div>
            </div>
            {showSaveMoneyAppBar && (
                <SaveMoneyAppBar
                    setShow={setShowSaveMoneyAppBar}
                    vaultName={vault.name}
                />
            )}
            {showRedeemMoneyAppBar && (
                <RendeemMoneyAppBar
                    setShow={setShowRedeemMoneyAppBar}
                    vaultName={vault.name}
                />
            )}
        </TopAppBar>
    )
}
