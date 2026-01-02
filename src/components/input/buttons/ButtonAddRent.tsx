import { useState } from "react"

import Message from "../../windows/Message"
import Button from "../Button"

import type { APIResponse } from "../../../types/APIResponse"
import APIRents from "../../../services/api/APIRents"

interface ButtonAddRentProps {
    newRentDescription: string
    newRentValue: number
}


export default function ButtonAddRent({ newRentDescription, newRentValue } : ButtonAddRentProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')
    
    const addRent = () => {
        const response: APIResponse = APIRents.addRent(
            newRentDescription, newRentValue
        )

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="bg-brand-300 p-4 text-white font-bold cursor-pointer
                    shadow-[2px_2px_green] hover:shadow-none hover:bg-brand-200
                    transition duration-300 mb-1"
                handleClick={addRent}
                content="Adicionar"
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
