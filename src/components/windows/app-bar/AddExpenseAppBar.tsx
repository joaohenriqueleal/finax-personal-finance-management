import APICategories from "../../../services/api/APICategories"

import { useState } from "react"

import ButtonAddExpense from "../../input/buttons/ButtonAddExpense"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"

interface AddExpenseAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AddExpenseAppBar({ setShow } : AddExpenseAppBarProps ) {
    const [selectedCategory, setSelectedCategory] = useState<string>(APICategories.categories[0].name)
    const [expenseDescription, setExpenseDescription] = useState<string>('')
    const [expenseValue, setExpenseValue] = useState<number>(0)

    return (
        <TopAppBar
            title="Adicionar saída"
            setShow={setShow}
        >
            <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                <Form extraStyles="gap-12">
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o valor da despesa (R$)"
                        handleChange={setExpenseValue}
                        label="Valor:"
                        id="inputNEV"
                        type="number"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a descrição da despesa"
                        handleChange={setExpenseDescription}
                        label="Descrição:"
                        id="inputNED"
                        type="text"
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="selectCategory">Categoria:</label>
                        <select
                            className="border p-4 outline-none bg-gray-100"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            id="selectCategory"
                        >
                            {APICategories.categories.map((c, i) => (
                                <option
                                    value={c.name}
                                    key={i}
                                >
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <ButtonAddExpense
                        expenseDescription={expenseDescription}
                        selectedCategory={selectedCategory}
                        expenseValue={expenseValue}
                    />
                </Form>
            </div>
        </TopAppBar>
    )
}
