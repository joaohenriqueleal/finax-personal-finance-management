import { useState } from "react"

import Message from "../../windows/Message"
import Button from "../Button"

import type { APIResponse } from "../../../types/APIResponse"
import APIVault from "../../../services/api/APIVault"
import type { Vault } from "../../../types/Vault"

interface ButtonDeleteVaultProps {
    vault: Vault
}


export default function ButtonDeleteVault({ vault } : ButtonDeleteVaultProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const deleteVault = () => {
        const response: APIResponse = APIVault.deleteVault(vault.name)

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="p-4 bg-red-500 text-white font-bold shadow-[2px_2px_black]
                    hover:bg-red-300 cursor-pointer transition duration-300 hover:shadow-none"
                handleClick={deleteVault}
                content="Deletar"
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
