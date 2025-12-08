import Globals from "../../shared/Globals"

import type { APIResponse } from "../../types/APIResponse"
import type { User } from "../../types/User"


export default abstract class APIUsers {
    static readonly usersStorage: string = 'finax_users'
    static users: User[] = this.loadUsers()

    static saveUsers() : void {
        localStorage.setItem(this.usersStorage, 
            JSON.stringify(this.users)
        )
    }

    static loadUsers() : User[] {
        const loadded: string | null = localStorage.getItem(this.usersStorage)
        const users: User[] = loadded ? JSON.parse(loadded) : []
        return users
    }

    static registerNewUser(username: string, password: string) : APIResponse {
        username = username.trim()
        password = password.trim()

        if (!username || !password) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        const exists: User | undefined = this.users.find(
            u => u.username.toLowerCase() == username.toLowerCase()
        )
        if (exists) {
            return { error: `Usuário '${username}' já está cadastrado!` }
        }

        this.users.push({username, password, createdAt: Date.now()})
        this.saveUsers()
        return { success: 'Usuário cadastrado com sucesso!' }
    }

    static loginUser(username: string, password: string) : APIResponse {
        username = username.trim()
        password = password.trim()

        if (!username || !password) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        const user: User | undefined = this.users.find(
            u => u.username.toLowerCase() == username.toLowerCase()
        )

        if (!user) {
            return { error: 'Usuário não encontrado!' }
        }

        if (user.password != password) {
            return { error: 'Senha incorreta inserida!' }
        }

        Globals.actualUser = user
        return { success: 'Logado com sucesso!' }
    }

}
