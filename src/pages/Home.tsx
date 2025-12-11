import PageContainer from "../components/layout/PageContainer"
import Header from "../components/layout/Header"
import Menu from "../components/layout/Menu"
import Title from "../components/ui/Title"

// TopBar components
import AboutAppBar from "../components/windows/app-bar/AboutAppBar"

import Globals from "../shared/Globals"

interface HomeProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Home({ setAuth } : HomeProps ) {
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
                        <div>
                            <AboutAppBar />
                        </div>
                    </div>
                    <Title
                        textContent={`Olá, ${Globals.actualUser.username.split(' ')[0]}`}
                        extraStyles="font-semibold text-xl"
                    />
                </div>
            </Header>
        </PageContainer>
    )
}
