import APICategories from "./APICategories"
import APIExpenses from "./APIExpenses"
import APIRents from "./APIRents"

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

    static deleteUser(password: string) : APIResponse {
        const userPassword = password.trim()

        if (!userPassword) {
            return { error: 'Por favvor, preencha todos os campos corretamente!' }
        }

        if (!(userPassword == Globals.actualUser.password)) {
            return { error: 'Senha incorreta inserida!' }
        }

        this.users = this.users.filter(
            u => u.username.toLowerCase() != Globals.actualUser.username.toLowerCase()
        )
        this.saveUsers()

        APICategories.removeActualUserCategories()
        APIRents.removeActualUserRents()
        APIExpenses.removeActualUserExpenses()

        Globals.removeActualUser()

        return { success: 'Usuário deletado com sucesso!' }
    }

    static editUsername(newUsername: string) : APIResponse {
        const name: string = newUsername.trim()
        if (!name) {
            return { error: 'Por favor, preencha todos os capos corretamente!' }
        }

        const usersAdded = [...this.users, {username: newUsername, password: '', createdAt: 0}]
        let countUsersNameEqualName: number = usersAdded.reduce(
            (acc, user) => user.username.toLowerCase() == name.toLowerCase() ? acc + 1 : acc, 0);
        if (countUsersNameEqualName > 1) {
            return { error: 'Já existe um usuário com esse nome! Tente outro!' }
        }

        this.users = this.users.map((u) => {
            if (u.username.toLowerCase() == Globals.actualUser.username.toLowerCase()) return { ...u, username: name }
            return u
        })
        
        this.saveUsers()

        APICategories.onSwitchUsername(name)
        APIExpenses.onSwitchUsername(name)
        APIRents.onSwitchUsername(name)

        Globals.actualUser = {...Globals.actualUser, username: name}

        return { success: 'Nome alterado com sucesso!' }
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
