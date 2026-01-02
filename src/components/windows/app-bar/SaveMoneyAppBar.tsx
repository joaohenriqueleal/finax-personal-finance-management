import { useState } from "react"

import ButtonSaveMoney from "../../input/buttons/ButtonSaveMoney"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"

interface SaveMoneyAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    vaultName: string
}


export default function SaveMoneyAppBar({ setShow, vaultName } : SaveMoneyAppBarProps) {
    const [valueToAdd, setValueToAdd] = useState<number>(0)
    
    return (
        <TopAppBar
            title="Guardar dinheiro"
            setShow={setShow}
        >
            <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                <Form>
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o valor a ser guardado (R$)"
                        handleChange={setValueToAdd}
                        label="Valor:"
                        type="number"
                        id="inputVTS"
                    />
                </Form>
                <ButtonSaveMoney
                    valueToAdd={valueToAdd}
                    vaultName={vaultName}
                />
            </div>
        </TopAppBar>
    )
}
