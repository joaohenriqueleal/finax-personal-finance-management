import ButtonDeleteVault from "../../input/buttons/ButtonDeleteVault"
import TopAppBar from "../TopAppBar"
import Title from "../../ui/Title"

import type { Vault } from "../../../types/Vault"

interface VaultsDeletionAppBarPros {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    vault: Vault
}


export default function VaultsDeletionAppBar({ setShow, vault } : VaultsDeletionAppBarPros ) {
    return (
        <TopAppBar
            title="Deletar cofre"
            setShow={setShow}
        >
            <div
                className="flex flex-col gap-8 text-black max-w-3xl mx-auto mb-1"
            >
                <Title
                    textContent={`Você deseja mesmo deletar o cofre ${vault.name}?`}
                    extraStyles="text-center"
                />
                <ButtonDeleteVault
                    vault={vault}
                />
            </div>
        </TopAppBar>
    )
}
