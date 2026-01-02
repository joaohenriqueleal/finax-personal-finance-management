import { useState } from "react"

import APIUsers from "../../../services/api/APIUsers"

import Message from "../../windows/Message"
import Button from "../Button"

import type { APIResponse } from "../../../types/APIResponse"

interface ButtonEditUsernameProps {
    newUsername: string
}


export default function ButtonEditUsername({ newUsername } : ButtonEditUsernameProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')
    
    const editUsername = () => {
        const response: APIResponse = APIUsers.editUsername(newUsername)

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="p-4 w-40 self-end bg-brand-300 text-white font-bold shadow-[2px_2px_green]
                    hover:shadow-none hover:bg-brand-200 cursor-pointer transition duration-300
                    mb-1"
                handleClick={editUsername}
                content='Editar'
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
