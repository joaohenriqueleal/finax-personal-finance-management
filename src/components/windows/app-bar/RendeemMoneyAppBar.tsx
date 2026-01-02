import { useState } from "react"

import ButtonRendeemMoney from "../../input/buttons/ButtonRendeemMoney"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"

interface RendeemMoneyAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    vaultName: string
}


export default function RendeemMoneyAppBar({ setShow, vaultName } : RendeemMoneyAppBarProps) {
    const [valueToRemove, setValueToRemove] = useState<number>(0)
    
    return (
        <TopAppBar
            title="Retirar dinheiro"
            setShow={setShow}
        >
            <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                <Form>
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o valor a ser retirado (R$)"
                        handleChange={setValueToRemove}
                        label="Valor:"
                        type="number"
                        id="inputVTR"
                    />
                </Form>
                <ButtonRendeemMoney
                    valueToRemove={valueToRemove}
                    vaultName={vaultName}
                />
            </div>
        </TopAppBar>
    )
}
