import type { APIResponse } from "../../../types/APIResponse"
import APIUsers from "../../../services/api/APIUsers"
import { useState } from "react"

import Message from "../../windows/Message"
import Button from "../Button"

interface ButtonDeleteUserProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
    password: string
}


export default function ButtonDeleteUser({ password, setAuth } : ButtonDeleteUserProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')
    
    const deleteUser = () => {
        const response: APIResponse = APIUsers.deleteUser(password)

        if (response.success) {
            setAuth(false)
        }

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="p-4 w-40 self-end bg-red-500 text-white font-bold shadow-[2px_2px_black]
                    hover:shadow-none hover:bg-red-300 cursor-pointer transition duration-300"
                handleClick={deleteUser}
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
