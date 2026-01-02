import { useState } from "react"

import ButtonAddVault from "../../input/buttons/ButtonAddVault"
import Input from "../../input/Input"
import Form from "../../input/Forrm"
import TopAppBar from "../TopAppBar"


interface AddVaultAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AddVaultAppBar({ setShow } : AddVaultAppBarProps ) {
    const [vaultDescription, setVaultDescription] = useState<string>('')
    const [vaultName, setVaultName] = useState<string>('')
    const [vaultGoal, setVaultGoal] = useState<number>(0)

    return (
        <TopAppBar
            title="Novo cofre"
            setShow={setShow}
        >
            <div className="flex flex-col gap-16 text-black max-w-4xl mx-auto">
                <Form extraStyles="gap-8">
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o seu objetivo pra esse cofre"
                        handleChange={setVaultDescription}
                        label="Descrição:"
                        id="inputVD"
                        type="text"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira o nome desse cofre"
                        handleChange={setVaultName}
                        label="Nome:"
                        id="inputVN"
                        type="text"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 transition shadow duration-300
                            focus:border-gray-400"
                        placeholder="Insira a meta desse cofre (R$)"
                        handleChange={setVaultGoal}
                        type="number"
                        label="Meta:"
                        id="inputVG"
                    />
                    <ButtonAddVault
                        vaultDescription={vaultDescription}
                        vaultName={vaultName}
                        vaultGoal={vaultGoal}
                    />
                </Form>
            </div>
        </TopAppBar>
    )
}
