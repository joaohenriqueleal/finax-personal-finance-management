import Button from "../Button"

import { FaEye, FaEyeSlash } from "react-icons/fa"

interface ButtonShowDataProps {
    setShowData: React.Dispatch<React.SetStateAction<boolean>>
    showData: boolean
}


export default function ButtonShowData({ setShowData, showData } : ButtonShowDataProps ) {
    return (
        <Button
            extraStyles="p-1 rounded-full hover:text-white/70 cursor-pointer
                transition duration-300"
            content={showData ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
            handleClick={() => setShowData(!showData)}
        />
    )
}
