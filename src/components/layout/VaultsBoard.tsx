import APIVault from "../../services/api/APIVault"

import VaultItem from "../items/VaultItem"


export default function VaultsBoard() {
    return (
        <>
            {APIVault.vaults.length > 0 ? (
                <div className="flex gap-4 flex-wrap p-4 bg-gray-100/70 rounded-xl"
                >
                    {APIVault.vaults.map((v, i) => (
                        <VaultItem
                            vault={v}
                            key={i}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center p-4 bg-gray-100/70 rounded-xl">
                    <p className="font-bold text-gray-600">Você ainda não possui nenhum cofre.</p>
                </div>
            )}
        </>
        
    )
}
