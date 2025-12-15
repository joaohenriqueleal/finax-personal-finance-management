import { useState } from "react"

import ButtonCreateNewCategory from "../../input/buttons/ButtonCreateNewCategory"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"

interface NewCategoryAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function NewCategoryAppBar({ setShow } : NewCategoryAppBarProps ) {
    const [categoryDescription, setCategoryDescription] = useState<string>('')
    const [categoryMonthGoal, setCategoryMonthGoal] = useState<number>(0)
    const [categoryName, setCategoryName] = useState<string>('')
    
    return (
        <TopAppBar
            title="Nova categoria"
            setShow={setShow}
        >
            <div
                className="flex flex-col gap-4 w-full text-black max-w-4xl mx-auto"
            >
                <Form extraStyles="gap-12">
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o nome da categoria"
                        handleChange={setCategoryName}
                        label="Nome:"
                        id="inputNCN"
                        type="text"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a meta mensal de gastos R$"
                        handleChange={setCategoryMonthGoal}
                        label="Meta mensal:"
                        type="number"
                        id="inputMG"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a descrição da categoria"
                        handleChange={setCategoryDescription}
                        label="Descrição:"
                        id="inputCD"
                        type="text"
                    />
                    <ButtonCreateNewCategory
                        categoryDescription={categoryDescription}
                        categoryMonthGoal={categoryMonthGoal}
                        categoryName={categoryName}
                    />
                </Form>
            </div>
        </TopAppBar>
    )
}
