import { useState } from "react"

import { FaTrash } from "react-icons/fa"
import { FaPen } from "react-icons/fa"

import ButtonEditUsername from "../../input/buttons/ButtonEditUsername"
import ButtonDeleteUser from "../../input/buttons/ButtonDeleteUser"
import Input from "../../input/Input"
import TopAppBar from "../TopAppBar"

interface ProfileConfigAppBarProps {
    setShowConfigTAB: React.Dispatch<React.SetStateAction<boolean>>
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ProfileConfigAppBar({ setShowConfigTAB, setAuth } : ProfileConfigAppBarProps ) {    
    const [showTABEditUsername, setShowTABEditUsername] = useState<boolean>(false)
    const [showTABDeleteUser, setShowTABDeleteUser] = useState<boolean>(false)

    const [newUsername, setNewUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    return (
        <TopAppBar
            setShow={setShowConfigTAB}
            title="Perfil"
        >
            <div className="text-black max-w-4xl mx-auto flex flex-col gap-4">
                <button
                    className="flex gap-2 p-4 bg-brand-300 w-full text-white
                        font-bold items-center shadow-[2px_2px_green] hover:shadow-none
                        transition duration-300 cursor-pointer hover:bg-brand-200"
                    onClick={() => setShowTABEditUsername(true)}
                >
                    <FaPen /> Editar nome de usuário
                </button>
                <button
                    className="flex gap-2 p-4 bg-red-500 w-full text-white
                        font-bold items-center shadow-[2px_2px_green] hover:shadow-none
                        transition duration-300 cursor-pointer hover:bg-red-300"
                    onClick={() => setShowTABDeleteUser(true)}
                >
                    <FaTrash /> Deletar usuário
                </button>
            </div>
            {showTABEditUsername && (
                <TopAppBar
                    setShow={setShowTABEditUsername}
                    title="Editar nome de usuário"
                >
                    <div className="flex flex-col gap-16 text-black max-w-4xl mx-auto">
                        <Input
                            inputStyles="p-4 outline-none border-2 transition shadow duration-300
                                focus:border-gray-400"
                            placeholder="Insira seu novo nome de usuário"
                            handleChange={setNewUsername}
                            label="Novo nome:"
                            id="inputUsername"
                            type="text"
                        />
                        <ButtonEditUsername
                            newUsername={newUsername}
                        />
                    </div>
                </TopAppBar>
            )}
            {showTABDeleteUser && (
                <TopAppBar
                    setShow={setShowTABDeleteUser}
                    title="Confirmar deleção de usuário"
                >
                    <div className="flex flex-col gap-16 text-black max-w-4xl mx-auto">
                        <Input
                            inputStyles="p-4 outline-none border-2 border-black shadow-[2px_2px_black]
                                hover:shadow-none transition duration-300 focus:shadow-[2px_2px_gray]"
                            placeholder="Insira sua senha pra confirmar"
                            handleChange={setPassword}
                            id="inputPassword"
                            type="password"
                            label="Senha:"
                        />
                        <ButtonDeleteUser
                            password={password}
                            setAuth={setAuth}
                        />
                    </div>
                </TopAppBar>
            )}
        </TopAppBar>
    )
}
