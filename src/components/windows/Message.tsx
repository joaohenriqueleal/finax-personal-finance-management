import { useRef, useEffect, useState } from "react"

import { FaTimes } from "react-icons/fa"
import Button from "../input/Button"

interface MessageProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    message: string
}

export default function Message({ setShow, message }: MessageProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [progress, setProgress] = useState(100)

    const close = () => {
        if (!containerRef.current) return

        const el = containerRef.current
        el.classList.remove("anim-message-open")
        el.classList.add("anim-message-close")

        const handleEnd = () => {
            setShow(false)
            el.removeEventListener("animationend", handleEnd)
        }

        el.addEventListener("animationend", handleEnd)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            close()
        }, 5000)

        const interval = setInterval(() => {
            setProgress(prev => (prev > 0 ? prev - 1 : 0))
        }, 50)

        return () => {
            clearTimeout(timer)
            clearInterval(interval)
        }
    }, [])

    return (
        <div
            className="p-4 bg-brand-500 fixed right-4 top-4 shadow-xl flex
            text-white max-w-80 items-center justify-center flex-col anim-message-open"
            ref={containerRef}
        >
            <div className="flex items-center gap-2">
                <p className="text-sm tracking-wide font-semibold">{message}</p>

                <Button
                    extraStyles="hover:bg-brand-300 p-2 rounded-full cursor-pointer
                        transition duration-300"
                    content={<FaTimes />}
                    handleClick={close}
                />
            </div>
            <div className="w-full h-1 bg-white/40 rounded-full mt-2 overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-50"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
