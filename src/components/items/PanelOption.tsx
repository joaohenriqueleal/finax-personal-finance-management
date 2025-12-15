import { useState } from "react"

interface PanelOptionProps {
    Tab: React.ComponentType<{
        setShow: React.Dispatch<React.SetStateAction<boolean>>
    }>
    icon: React.ReactNode
    legend: string
}


export default function PanelOption({ icon, legend, Tab } : PanelOptionProps ) {
    const [showTab, setShowTab] = useState<boolean>(false)
    
    return (
        <>
            <div className="flex flex-col gap-2 max-w-20">
                <div
                    className="p-6 bg-gray-200 w-min rounded-full text-2xl
                        hover:bg-gray-300 transition duration-300 cursor-pointer"
                    onClick={() => setShowTab(true)}
                >
                    {icon}
                </div>
                <h2 className="max-w-20 font-bold text-center">{legend}</h2>
            </div>
            {showTab && (
                <Tab setShow={setShowTab} />
            )}
        </>
    )
}
