import { useRef } from "react"

import Button from "../input/Button"
import Title from "../ui/Title"

import { FaChevronLeft } from "react-icons/fa"

interface TopAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    title?: string
}


export default function TopAppBar({ children, setShow, title }: TopAppBarProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const close = () => {
        if (!containerRef.current) return

        const el = containerRef.current
        el.classList.remove("anim-top-bar-open")
        el.classList.add("anim-top-bar-close")

        const handleEnd = () => {
            setShow(false)
            el.removeEventListener("animationend", handleEnd)
        }

        el.addEventListener("animationend", handleEnd)
    }

    return (
        <div
            ref={containerRef}
            className="
                fixed inset-0 h-screen w-screen z-999999 
                bg-white p-6 flex flex-col gap-10
                anim-top-bar-open
            "
        >
            <div className="flex items-center gap-4 text-black">
                <Button
                    extraStyles="
                        p-3 rounded-full hover:bg-black/5 
                        transition duration-200 text-xl cursor-pointer
                    "
                    content={<FaChevronLeft />}
                    handleClick={close}
                />

                <Title
                    textContent={title || ""}
                    extraStyles="font-semibold text-xl"
                />
            </div>
            <div 
                className="pr-2 scrollbar-thin overflow-auto
                scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
                {children}
            </div>
        </div>
    )
}
