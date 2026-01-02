import { useState } from "react"

import Message from "../../windows/Message"
import Button from "../Button"

import type { APIResponse } from "../../../types/APIResponse"
import APIVault from "../../../services/api/APIVault"

interface ButtonSaveMoneyProps {
    valueToAdd: number
    vaultName: string
}


export default function ButtonSaveMoney({ vaultName, valueToAdd } : ButtonSaveMoneyProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const saveMoneyOnVault = () => {
        const response: APIResponse = APIVault.saveBalanceOnVault(vaultName, valueToAdd)

        setMessageToShow(response.success || response.error || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="p-4 bg-brand-300 text-white font-bold w-full
                    hover:bg-brand-200 transition duration-300 cursor-pointer
                    shadow-[2px_2px_green] hover:shadow-none mb-1"
                handleClick={saveMoneyOnVault}
                content="Guardar"
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
