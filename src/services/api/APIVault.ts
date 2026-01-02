import Globals from "../../shared/Globals"

import type { APIResponse } from "../../types/APIResponse"
import type { Vault } from "../../types/Vault"


export default abstract class APIVault {
    static vaultsStorage: string = `${Globals.actualUser.username}:vaults`
    static vaults: Vault[] = this.loadVault()

    static loadVault() : Vault[] {
        const loaded: string | null = localStorage.getItem(this.vaultsStorage)
        const vaults: Vault[] = loaded ? JSON.parse(loaded) : []
        return vaults
    }

    static saveVaults() : void {
        localStorage.setItem(this.vaultsStorage, JSON.stringify(
            this.vaults
        ))
    }

    static addVault(vaultDescription: string, vaultName: string,
        vaultGoal: number) : APIResponse {
        const description: string = vaultDescription.trim()
        const name: string = vaultName.trim()
        
        if (!description || !name || !vaultGoal) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        const exists = this.vaults.find(
            v => v.name.toLowerCase() == name.toLowerCase()
        )

        if (exists) {
            return { error: 'Já existe um cofre com esse nome!' }
        }

        this.vaults.push({
            createdAt: Date.now(),
            name,
            description,
            goal: vaultGoal,
            balance: 0
        })
        this.saveVaults()

        return { success: 'Cofre adicionado com sucesso!' }
    }

    static removeActualUserVaults() : void {
        localStorage.removeItem(this.vaultsStorage)
    }

    static onSwitchUsername(newUsername: string) {
        localStorage.removeItem(this.vaultsStorage)
        this.vaultsStorage = `${newUsername}:vaults`
        localStorage.setItem(this.vaultsStorage, JSON.stringify(
            this.vaults
        ))
    }

    static saveBalanceOnVault(vaultName: string, valueToAdd: number) : APIResponse {
        const name = vaultName.trim()

        if (!name || !valueToAdd) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        const exists = this.vaults.find(
            v => v.name.toLowerCase() == name.toLowerCase()
        )

        if (!exists) {
            return { error: 'Cofre não encontrado!' }
        }

        this.vaults = this.vaults.map((v) => {
            if (v.name.toLowerCase() == name.toLowerCase()) {
                return {...v, balance: Number(v.balance) + Number(valueToAdd)}
            }
            return v
        })
        console.log(this.vaults)
        this.saveVaults()

        return { success: 'Dinheiro guardado com sucesso!' }
    }

    static removeBalanceOnVault(vaultName: string, valueToRemove: number) : APIResponse {
        const name = vaultName.trim()

        if (!name || !valueToRemove) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        const exists = this.vaults.find(
            v => v.name.toLowerCase() == name.toLowerCase()
        )

        if (!exists) {
            return { error: 'Cofre não encontrado!' }
        }

        this.vaults = this.vaults.map((v) => {
            if (v.name.toLowerCase() == name.toLowerCase()) {
                return {...v, balance: Number(v.balance) - Number(valueToRemove)}
            }
            return v
        })
        console.log(this.vaults)
        this.saveVaults()

        return { success: 'Dinheiro resgatado com sucesso!' }
    }

    static deleteVault(vaultName: string) : APIResponse {
        this.vaults = this.vaults.filter(
            v => v.name.toLowerCase() != vaultName.toLowerCase()
        )
        this.saveVaults()

        return { success: 'Cofre deletado com sucesso!' }
    }

}
