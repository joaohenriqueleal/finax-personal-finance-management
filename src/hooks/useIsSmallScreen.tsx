import { useState, useEffect } from "react"


export default function useIsSmallScreen() {
    const [isSmall, setIsSmall] = useState(
        typeof window !== "undefined" && window.innerWidth < 640
    )

    useEffect(() => {
        const onResize = () => setIsSmall(window.innerWidth < 640)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return isSmall
}
