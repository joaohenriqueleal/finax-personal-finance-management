import { useRef, useState } from "react"

import APIUsers from "../../services/api/APIUsers"
import Globals from "../../shared/Globals"

import { formatTimestamp } from "../../utils/formatTimestamp"
import { FaSignOutAlt } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"

import ProfileConfigAppBar from "../windows/app-bar/ProfileConfigAppBar"
import Button from "../input/Button"
import Title from "../ui/Title"

interface ConfigurationsProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Configurations({ setShow, setAuth } : ConfigurationsProps ) {
    const [showConfigTAB, setShowConfigTAB]  = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const close = () => {
        if (!containerRef.current) return

        const el = containerRef.current
        el.classList.remove("anim-config-open")
        el.classList.add("anim-config-close")

        const handleEnd = () => {
            setShow(false)
            el.removeEventListener("animationend", handleEnd)
        }

        el.addEventListener("animationend", handleEnd)
    }

    const getRegisterUserDate = (): string => {
        const user = APIUsers.users.find(
            u => u.username === Globals.actualUser.username
        )

        return formatTimestamp(user?.createdAt ?? Date.now())
    }

    const unLogin = () => {
        Globals.removeActualUser()
        setAuth(false)
    }

    return (
        <>
            <div
                className="fixed inset-0 h-screen w-screen bg-black/30 flex items-end 
                    backdrop-blur-[2px]"
                onClick={close}
            >
                <div
                    className="w-full bg-white p-8 h-64 rounded-t-3xl anim-config-open
                        text-black flex flex-col justify-between max-w-4xl mx-auto"
                    onClick={(e) => e.stopPropagation()}
                    ref={containerRef}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <Title textContent={`${Globals.actualUser.username}`} />
                            <Button
                                extraStyles="p-2 hover:bg-gray-200 rounded-full
                                    transition duration-300 cursor-pointer"
                                handleClick={() => setShowConfigTAB(true)}
                                content={<FaGear size={22} />}
                            />
                        </div>
                        <p>Cadastrado em - {getRegisterUserDate()}</p>
                    </div>
                    <button
                        className="flex gap-2 p-3 w-full hover:bg-red-500 items-center
                            text-xl bg-red-700 text-white cursor-pointer transition duration-300
                            shadow-[2px_2px_black] hover:shadow-none"
                        onClick={unLogin}
                    >
                        <FaSignOutAlt /> Sair
                    </button>
                </div>
            </div>
            {showConfigTAB && (
                <ProfileConfigAppBar
                    setShowConfigTAB={setShowConfigTAB}
                    setAuth={setAuth}
                />
            )}
        </>
    )
}
