import { useState } from 'react'

import PigVault from '../../assets/imgs/pig-vault.png'
import formatPrice from '../../utils/formatPrice'
import type { Vault } from "../../types/Vault"

import VaultDatailsAppBar from '../windows/app-bar/VaultDetailsAppBar'
import Img from "../ui/Img"

interface VaultItemProps {
    vault: Vault
}


export default function VaultItem({ vault } : VaultItemProps ) {
    const [showVaultDetailsAppBar, setShowVaultDetailsAppBar] = useState<boolean>(false)
    
    return (
        <>
            <div
                className="bg-gray-200/70 p-2 rounded-md flex flex-col gap-4 shadow
                    hover:shadow-md transition duration-300 cursor-pointer transform
                    hover:-translate-y-1 hover:bg-gray-100 max-w-40 w-[124px] md:w-max"
                onClick={() => setShowVaultDetailsAppBar(true)}
            >
                <div>
                    <Img
                        extraStyles="bg-gray-100 p-4 rounded-md"
                        alt="cofre de porquinho"
                        src={PigVault}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className="font-bold text-gray-800">
                        {vault.name}
                    </p>
                    <p className='font-bold text-brand-500'>
                        {formatPrice(vault.balance)}
                    </p>
                </div>
            </div>
            {showVaultDetailsAppBar && (
                <VaultDatailsAppBar
                    setShow={setShowVaultDetailsAppBar}
                    vault={vault}
                />
            )}
        </>
    )
}
