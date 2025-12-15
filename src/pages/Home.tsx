import { useState } from "react"

import ButtonShowData from "../components/input/buttons/ButtonShowData"
import PageContainer from "../components/layout/PageContainer"
import Header from "../components/layout/Header"
import Menu from "../components/layout/Menu"
import Main from "../components/layout/Main"
import Title from "../components/ui/Title"

// TopBar components
import AboutAppBar from "../components/windows/app-bar/AboutAppBar"

// Sections
import SectionControlPanel from "../components/pages/SectionControlPanel"
import SectionBalance from "../components/pages/SectionBalance"

import Globals from "../shared/Globals"

interface HomeProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Home({ setAuth } : HomeProps ) {
    const [showBalance, setShowBalance] = useState<boolean>(true)
    
    return (
        <PageContainer>
            <Header
                extraStyles="p-6 bg-brand-300 text-white flex items-center-justify-center"
            >
                <div
                    className="text-white flex flex-col gap-8 w-full max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-between">
                        <Menu setAuth={setAuth} />
                        <div className="flex gap-2">
                            <ButtonShowData
                                setShowData={setShowBalance}
                                showData={showBalance}
                            />
                            <AboutAppBar />
                        </div>
                    </div>
                    <Title
                        textContent={`Olá, ${Globals.actualUser.username.split(' ')[0]}`}
                        extraStyles="font-semibold text-xl"
                    />
                </div>
            </Header>
            <Main extraStyles="p-4 lg:px-0 max-w-4xl mx-auto flex flex-col gap-6">
                <SectionBalance
                    showBalance={showBalance}
                />
                <SectionControlPanel />
            </Main>
        </PageContainer>
    )
}
