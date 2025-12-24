import { useRef } from "react"
import { FaSync } from "react-icons/fa"

export default function ButtonReloadPage() {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const reload = () => {
        buttonRef.current?.classList.add("anim-reload")
    }

    const handleAnimationEnd = () => {
        location.reload()
    }

    return (
        <button
            className="
                hover:text-white/70 transition duration-300
                cursor-pointer p-1
            "
            onAnimationEnd={handleAnimationEnd}
            onClick={reload}
            ref={buttonRef}
        >
            <FaSync />
        </button>
    )
}
