import { useState } from "react"

import APICategories from "../../../services/api/APICategories"
import Message from "../../windows/Message"
import Button from "../Button"

import type { APIResponse } from "../../../types/APIResponse"

interface ButtonCreateNewCategoryProps {
    categoryDescription: string
    categoryMonthGoal: number
    categoryName: string
}


export default function ButtonCreateNewCategory(
    {
        categoryDescription, categoryName, categoryMonthGoal
    } : ButtonCreateNewCategoryProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const createNewCategory = () => {
        const response: APIResponse = APICategories.createNewCategory(
            categoryDescription, categoryName, categoryMonthGoal
        )

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }
    
    return (
        <>
            <Button
                extraStyles="self-end p-4 bg-brand-300 w-40 text-white font-bold
                    shadow-[2px_2px_green] hover:shadow-none hover:bg-brand-200
                    transition duration-300 cursor-pointer"
                handleClick={createNewCategory}
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
