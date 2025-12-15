import { useRef } from "react"
import PanelOption from "../items/PanelOption"
import CategoriesAppBar from "../windows/app-bar/CategoriesAppBar"
import { FaTh } from "react-icons/fa"

export default function SectionControlPanel() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const isDown = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const onMouseDown = (e: React.MouseEvent) => {
        isDown.current = true
        startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
        scrollLeft.current = scrollRef.current?.scrollLeft || 0
    }

    const onMouseLeave = () => { isDown.current = false }
    const onMouseUp = () => { isDown.current = false }

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current) return
        e.preventDefault()
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
        const walk = x - startX.current
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft.current - walk
        }
    }

    return (
        <section className="w-full px-6">
            <div
                ref={scrollRef}
                className="
                    flex gap-8 overflow-x-auto select-none
                    no-scrollbar py-4
                "
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <PanelOption
                    Tab={CategoriesAppBar}
                    legend="Categorias"
                    icon={<FaTh />}
                />
            </div>
        </section>
    )
}
