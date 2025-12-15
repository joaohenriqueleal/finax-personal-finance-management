import { useState } from "react"

import ButtonEditCategory from "../../input/buttons/ButtonEditCategory"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"

import type { Category } from "../../../types/Category"

interface EditCategoryAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    category: Category
}


export default function EditCategoryAppBar({ setShow, category } : EditCategoryAppBarProps ) {
    const [newCategoryDescription, setNewCategoryDescription] = useState<string>('')
    const [newCategoryMonthGoal, setNewCategoryMonthGoal] = useState<number>(0)
    const [newCategoryName, setNewCategoryName] = useState<string>('')
    
    return (
        <TopAppBar
            title={`Editar categoria ${category.name}`}
            setShow={setShow}
        >
            <div
                className="flex flex-col gap-8 w-full text-black max-w-4xl mx-auto"
            >
                <Form extraStyles="gap-8">
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o novo nome da categoria"
                        handleChange={setNewCategoryName}
                        label="Novo nome:"
                        id="InputNCN"
                        type="text"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a nova descrição da categoria"
                        handleChange={setNewCategoryDescription}
                        label="Nova descrição:"
                        id="InputNCD"
                        type="text"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a nova meta mensal"
                        handleChange={setNewCategoryMonthGoal}
                        label="Nova meta mensal:"
                        id="InputNCMG"
                        type="number"
                    />
                    <ButtonEditCategory
                        newCategoryDescription={newCategoryDescription}
                        newCategoryMonthGoal={newCategoryMonthGoal}
                        originalCategoryName={category.name}
                        newCategoryName={newCategoryName}
                    />
                </Form>
            </div>
        </TopAppBar>
    )
}
