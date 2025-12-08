import { Link } from "react-router-dom"
import { useState } from "react"

import PageContainer from "../components/layout/PageContainer"
import Message from "../components/windows/Message"
import Header from "../components/layout/Header"
import Button from "../components/input/Button"
import Input from "../components/input/Input"
import Main from "../components/layout/Main"
import Form from "../components/input/Forrm"
import Title from "../components/ui/Title"
import Img from "../components/ui/Img"

import type { APIResponse } from "../types/APIResponse"

import APIUsers from "../services/api/APIUsers"
import Globals from "../shared/Globals"

import Logo from '../../public/finax-logo.png'


interface RegisterProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Register({ setAuth } : RegisterProps ) {
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [messageToShow, setMessageToShow] = useState<string>('')

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const registerUser = () : void => {
        const response: APIResponse = APIUsers.registerNewUser(username, password)

        if (response.success) {
            Globals.actualUser = { username, password }
            setAuth(true)
        }
        setMessageToShow(response.error || response.success || '')
        setShowMessage(true)
    }

    return (
        <PageContainer extraStyles="flex flex-col lg:flex-row">
            <Header
                extraStyles="bg-brand-300 lg:h-screen lg:w-1/2 flex
                    items-center justify-center"
            >
                <Img
                    alt="Finax logo"
                    src={Logo}
                />
            </Header>
            <Main extraStyles="gap-16 p-16 lg:h-screen md:items-center lg:justify-center lg:w-1/2">
                <Title textContent="Olá, crie já sua conta na Finax!" />
                <Form extraStyles="gap-12 lg:w-100 md:w-150 xl:w-120" >
                    <Input
                        inputStyles="p-4 outline-none border-2 shadow-[3px_3px_black] transition
                            hover:shadow-none duration-300 focus:shadow-[3px_3px_gray]
                            focus:border-gray-400"
                        placeholder="Insira seu nome"
                        handleChange={setUsername}
                        id="inputUsername"
                        label="Nome:"
                        type="text"
                    />
                    <Input
                        inputStyles="p-4 outline-none border-2 shadow-[3px_3px_black] transition
                            hover:shadow-none duration-300 focus:shadow-[3px_3px_gray]
                            focus:border-gray-400"
                        placeholder="Insira sua senha"
                        handleChange={setPassword}
                        id="inputPassword"
                        type="password"
                        label="Senha:"
                    />
                    <div className="flex flex-col gap-4">
                        <Button
                            extraStyles="p-4 w-full bg-brand-300 text-white
                                font-bold shadow-[3px_3px_green] hover:shadow-none
                                hover:bg-brand-200 hover:translate-y-1 transition
                                duration-300 cursor-pointer"
                            handleClick={registerUser}
                            content="Registrar"
                        />
                        <Link
                            className="self-end underline text-purple-800
                                hover:text-purple-400"
                            to='/login'
                        >
                            Já tem uma conta? Login
                        </Link>
                    </div>
                </Form>
            </Main>
            {showMessage && (
                <Message
                    setShow={setShowMessage}
                    message={messageToShow}
                />
            )}
        </PageContainer>
    )
}
