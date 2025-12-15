import { useState } from "react"

import Button from "../../input/Button"
import TopAppBar from "../TopAppBar"
import Title from "../../ui/Title"
import Message from "../Message"

import APICategories from "../../../services/api/APICategories"
import type { APIResponse } from "../../../types/APIResponse"
import type { Category } from "../../../types/Category"

interface DeleteCategoryAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    category: Category
}


export default function DeleteCategoryAppBar({ setShow, category } : DeleteCategoryAppBarProps ) {
    const [showMeessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')
    
    const deleteCategory = () => {
        const response: APIResponse = APICategories.deleteCategory(category.name)

        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }
    
    return (
        <TopAppBar
            title="Deletar categoria"
            setShow={setShow}
        >
            <div className="flex flex-col gap-16 text-black max-w-4xl mx-auto">
                <Title
                    textContent={`Você deseja mesmo deletar a categoria
                        ${category.name} e todas as suas movimentações?`}
                    extraStyles="text-xl"
                />
                <Button
                    extraStyles="w-full bg-red-600 p-4 text-white font-bold
                        cursor-pointer transition duration-300 hover:shadow-none
                        hover:bg-red-400 shadow-[2px_2px_black]"
                    handleClick={deleteCategory}
                    content="Deletar"
                />
            </div>
            {showMeessage && (
                <Message
                    setShow={setShowMessage}
                    message={messageToShow}
                />
            )}
        </TopAppBar>
    )
}
