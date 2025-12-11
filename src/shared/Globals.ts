import type { LoginUser } from "../types/LoginUser"


export default abstract class Globals {
    static readonly actualUserStorage: string = 'actual_user'
    static _actualUser: LoginUser = this.loadActualUser()
    
    static authenticated: boolean = this._actualUser.username ? true : false

    static saveActualUser() : void {
        localStorage.setItem(this.actualUserStorage, JSON.stringify(
            this._actualUser
        ))
    }

    static loadActualUser() : LoginUser {
        const loaded: string | null = localStorage.getItem(this.actualUserStorage)
        const user: LoginUser = loaded ? JSON.parse(loaded) : {}
        return user
    }

    static removeActualUser() : void {
        localStorage.removeItem(this.actualUserStorage)
    }

    static get actualUser() { return this._actualUser }
    static set actualUser(user: LoginUser) {
        this._actualUser = user
        this.saveActualUser()
    }

}
