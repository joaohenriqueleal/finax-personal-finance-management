import { useState } from "react"

import APICategories from "../../../services/api/APICategories"
import type { APIResponse } from "../../../types/APIResponse"

import Message from "../../windows/Message"
import Button from "../Button"

interface ButtonEditCategoryProps {
    newCategoryDescription: string
    newCategoryMonthGoal: number
    originalCategoryName: string
    newCategoryName: string
}


export default function ButtonEditCategory(
    {
        newCategoryDescription, newCategoryMonthGoal, newCategoryName,
        originalCategoryName
    } : ButtonEditCategoryProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const editCategory = () => {
        const response: APIResponse = APICategories.editCategory(
            newCategoryDescription, newCategoryMonthGoal, newCategoryName,
            originalCategoryName
        )

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <>
            <Button
                extraStyles="p-4 self-end bg-brand-300 text-white font-bold w-40
                    shadow-[2px_2px_black] hover:bg-brand-200 hover:shadow-none
                    transition duration-300 cursor-pointer"
                handleClick={editCategory}
                content="Editar"
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
