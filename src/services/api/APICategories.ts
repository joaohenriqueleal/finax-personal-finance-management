import Globals from "../../shared/Globals"

import type { APIResponse } from "../../types/APIResponse"
import type { Category } from "../../types/Category"

export default abstract class APICategories {
    static categoriesStorage: string = `${Globals._actualUser.username}:categories`
    static categories: Category[] = this.loadCategories()

    static loadCategories() : Category[] {
        const loaded: string | null = localStorage.getItem(this.categoriesStorage)
        const categories: Category[] = loaded ? JSON.parse(loaded) : []
        return categories
    }

    static saveCategories() : void {
        localStorage.setItem(this.categoriesStorage,
            JSON.stringify(this.categories)
        )
    }

    static removeActualUserCategories() : void {
        localStorage.removeItem(this.categoriesStorage)
    }

    static onSwitchUsername(newUsername: string) : void {
        localStorage.removeItem(this.categoriesStorage)
        this.categoriesStorage = `${newUsername}:categories`
        localStorage.setItem(this.categoriesStorage, JSON.stringify(
            this.categories
        ))
    }

    static deleteCategory = (categoryName: string) : APIResponse => {
        const name = categoryName.trim().toLowerCase()
        this.categories = this.categories.filter(
            c => c.name.toLowerCase() != name
        )
        this.saveCategories()

        return { success: 'Categoria deletada com sucesso!' }
    }

    static editCategory(newCategoryDescription: string, newCategoryMonthGoal: number,
        newCategoryName: string, originalCategoryName: string): APIResponse {
        const description: string = newCategoryDescription.trim()
        const name: string = newCategoryName.trim()

        if (!description || !newCategoryMonthGoal || !name) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        if (name.toLowerCase() !== originalCategoryName.toLowerCase()) {
            const exists: Category | undefined = this.categories.find(
                c => c.name.toLowerCase() == name.toLowerCase()
            )

            if (exists) {
                return { error: 'Já existe uma categoria com esse nome!' }
            }
        }

        const categoryIndex = this.categories.findIndex(
            c => c.name.toLowerCase() === originalCategoryName.toLowerCase()
        )

        if (categoryIndex !== -1) {
            this.categories[categoryIndex] = {
                ...this.categories[categoryIndex],
                name,
                description,
                monthGoal: newCategoryMonthGoal
            }

            this.saveCategories()
            return { success: 'Categoria atualizada com sucesso!' }
        }

        return { error: 'Categoria não encontrada!' }
    }

    static createNewCategory(categoryDescription: string,
        categoryName: string, categoryGoal: number
    ) : APIResponse {
        const description: string = categoryDescription.trim()
        const name: string = categoryName.trim()

        if (!description || !name || !categoryGoal) {
            return { error: 'Por favor, preencha todos os campos corretamente!' }
        }

        const exists: Category | undefined = this.categories.find(
            c => c.name.toLowerCase() == name.toLowerCase()
        )

        if (exists) {
            return { error: 'Categoria já cadastrada!' }
        }

        this.categories.push({
            name,
            description,
            createdAt: Date.now(),
            monthGoal: categoryGoal
        })
        this.saveCategories()

        return { success: 'Categoria cadastrada com sucesso!' }
    }

}
