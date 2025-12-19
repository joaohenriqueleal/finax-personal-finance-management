import type { APIResponse } from "../../types/APIResponse"
import type { Rent } from "../../types/Rent"

import Globals from "../../shared/Globals"


export default abstract class APIRents {
    static rentsStorage: string = `${Globals.actualUser.username}:rents`
    static rents: Rent[] = this.loadRents()

    static loadRents() : Rent[] {
        const loaded: string | null = localStorage.getItem(this.rentsStorage)
        return loaded ? JSON.parse(loaded) : []
    }

    static removeActualUserRents() : void {
        localStorage.removeItem(this.rentsStorage)
    }

    static onSwitchUsername(newUsername: string) : void {
        localStorage.removeItem(this.rentsStorage)
        this.rentsStorage = `${newUsername}:rents`
        localStorage.setItem(this.rentsStorage, JSON.stringify(
            this.rents
        ))
    }

    static saveRents() : void {
        localStorage.setItem(this.rentsStorage, JSON.stringify(
            this.rents
        ))
    }

    static addRent(newRentDescription: string, newRentValue: number) : APIResponse {
        const description: string = newRentDescription.trim()

        if (!newRentDescription || !newRentValue) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        this.rents.push({
            createdAt: Date.now(),
            value: newRentValue,
            description
        })
        this.saveRents()

        return { success: 'Entrada adicionada com sucesso!' }
    }

    static deleteRent(rentCreatedAt: number) : APIResponse {
        this.rents = this.rents.filter(r => r.createdAt != rentCreatedAt)
        this.saveRents()
        return { success: 'Entrada removida com sucesso!' }
    }

}
