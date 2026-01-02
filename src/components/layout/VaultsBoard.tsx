import APIVault from "../../services/api/APIVault"

import VaultItem from "../items/VaultItem"


export default function VaultsBoard() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100/70 rounded-xl">
            {APIVault.vaults.map((v, i) => (
                <VaultItem
                    vault={v}
                    key={i}
                />
            ))}
        </div>
    )
}
