import { useState } from "react"

import type { APIResponse } from "../../../types/APIResponse"
import APIVault from "../../../services/api/APIVault"

import Message from "../../windows/Message"
import Button from "../Button"


interface ButtonAddVaultProps {
    vaultDescription: string
    vaultName: string
    vaultGoal: number
}


export default function ButtonAddVault({
    vaultDescription, vaultName, vaultGoal
    } : ButtonAddVaultProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const addVault = () => {
        const response: APIResponse = APIVault.addVault(
            vaultDescription, vaultName, vaultGoal
        )

        setMessageToShow(response.success || response.error || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                handleClick={addVault}
                extraStyles="p-4 bg-vault text-white font-bold cursor-pointer
                    hover:bg-vault/70 transition duration-300 shadow-[2px_2px_orange]
                    hover:shadow-none mb-1"
                content="Criar"
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
