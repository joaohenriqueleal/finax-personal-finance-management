import { useState } from "react"

import Message from "../../windows/Message"
import Button from "../Button"

import type { APIResponse } from "../../../types/APIResponse"
import APIVault from "../../../services/api/APIVault"

interface ButtonRendeemMoneyProps {
    valueToRemove: number
    vaultName: string
}


export default function ButtonRendeemMoney({ vaultName, valueToRemove } : ButtonRendeemMoneyProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const removeMoneyOnVault = () => {
        const response: APIResponse = APIVault.removeBalanceOnVault(vaultName, valueToRemove)

        setMessageToShow(response.success || response.error || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="p-4 bg-gray-900 text-white font-bold w-full
                    hover:bg-gray-600 transition duration-300 cursor-pointer
                    shadow-[2px_2px_black] hover:shadow-none mb-1"
                handleClick={removeMoneyOnVault}
                content="Retirar"
            />
            {showMessage && (
                <Message
                    setShow={setShowMessage}
                    message={messageToShow}
                />
            )}
        </>
    )
}
