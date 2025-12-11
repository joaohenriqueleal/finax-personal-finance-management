import { useState } from "react"

import { FaUser } from "react-icons/fa"

import Configurations from "./Configurations"

interface MenuProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Menu({ setAuth } : MenuProps ) {
    const [showConfigurations, setShowConfigurations] = useState<boolean>(false)

    return (
        <>
            <div
                className="p-3 bg-brand-200/90 rounded-full hover:bg-brand-100/70
                    cursor-pointer transition duration-300 hover:shadow"
                onClick={() => setShowConfigurations(true)}
            >
                <FaUser size={24} />
            </div>
            {showConfigurations && (
                <Configurations
                    setShow={setShowConfigurations}
                    setAuth={setAuth}
                />
            )}
        </>
    )
}
