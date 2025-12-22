import Globals from "../../shared/Globals"

import type { APIResponse } from "../../types/APIResponse"
import type { Expense } from "../../types/Expense"


export default abstract class APIExpenses {
    static expensesStorage: string = `${Globals.actualUser.username}:expenses`
    static expenses: Expense[] = this.loadExpenses()

    static removeActualUserExpenses() : void {
        localStorage.removeItem(this.expensesStorage)
    }

    static onSwitchUsername(newUsername: string) : void {
        localStorage.removeItem(this.expensesStorage)
        this.expensesStorage = `${newUsername}:expenses`
        localStorage.setItem(this.expensesStorage, JSON.stringify(
            this.expenses
        ))
    }

    static loadExpenses() : Expense[] {
        const loaded: string | null = localStorage.getItem(this.expensesStorage)
        return loaded ? JSON.parse(loaded) : []
    }

    static saveExpenses() : void {
        localStorage.setItem(this.expensesStorage, JSON.stringify(
            this.expenses
        ))
    }

    static addExpense(expenseDescription: string, expenseCategory: string,
        expenseValue: number
    ) : APIResponse {
        const description: string = expenseDescription.trim()

        if (!description || !expenseCategory || !expenseValue) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        this.expenses.push({
            category: expenseCategory,
            description,
            value: expenseValue,
            createdAt: Date.now()
        })
        this.saveExpenses()
        
        return { success: 'Despesa adicionada com sucesso!' }
    }

    static deleteExpense(createdAt: number) : APIResponse {
        this.expenses = this.expenses.filter(r => r.createdAt != createdAt)
        this.saveExpenses()
        return { success: 'Saída removida com sucesso!' }
    }

}
