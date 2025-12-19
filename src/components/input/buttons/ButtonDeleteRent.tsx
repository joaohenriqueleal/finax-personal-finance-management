import Message from "../../windows/Message"
import Button from "../Button"

import { useState } from "react"

import APIRents from "../../../services/api/APIRents"
import type { APIResponse } from "../../../types/APIResponse"
import type { Rent } from "../../../types/Rent"

import { FaTrash } from "react-icons/fa"

interface ButtonDeleteRentProps {
    setOrdenedRents: React.Dispatch<React.SetStateAction<Rent[]>>
    rent: Rent
}


export default function ButtonDeleteRent({ rent, setOrdenedRents } : ButtonDeleteRentProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const deleteRent = () => {
        const response: APIResponse = APIRents.deleteRent(rent.createdAt)

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
        setOrdenedRents(APIRents.rents)
    }

    return (
        <>
            <Button
                extraStyles="bg-red-200/70 p-2 text-white rounded hover:bg-red-400
                    cursor-pointer transition duration-300 shadow"
                handleClick={deleteRent}
                content={<FaTrash />}
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
