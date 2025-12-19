import { useState } from "react"

import ButtonAddRent from "../../input/buttons/ButtonAddRent"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"

interface AddRentAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AddRentAppBar({ setShow } : AddRentAppBarProps) {
    const [newRentDescription, setNewRentDescription] = useState<string>('')
    const [newRentValue, setNewRentValue] = useState<number>(0)
    
    return (
        <TopAppBar
            title="Adicionar entrada"
            setShow={setShow}
        >
            <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                <Form extraStyles="gap-12">
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o valor da renda (R$)"
                        handleChange={setNewRentValue}
                        label="Valor:"
                        id="inputNRV"
                        type="number"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a descrição da renda"
                        handleChange={setNewRentDescription}
                        label="Descrição:"
                        id="inputNRD"
                        type="text"
                    />
                    <ButtonAddRent
                        newRentDescription={newRentDescription}
                        newRentValue={newRentValue}
                    />
                </Form>
            </div>
        </TopAppBar>
    )
}
