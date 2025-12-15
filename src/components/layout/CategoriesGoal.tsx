import CategorieProgressBar from "../items/CategorieProgressBar"
import Title from "../ui/Title"

import APICategories from "../../services/api/APICategories"


export default function CategoriesGoal() {
    const getTotalExpensed = (categoryName: string) => {
        return 133.75 // Implementar lógica do quanto o user gastou com aquela categoria NO MÊS
    }

    return (
        <div  className="flex flex-col gap-8 bg-gray-100 p-8 shadow">
            <Title
                textContent="Progresso das suas metas"
                extraStyles="text-center"
            />
            <div className="flex flex-col gap-6"> 
                {APICategories.categories.length > 0 ? (
                    APICategories.categories.map((c, i) => (
                        <CategorieProgressBar
                            totalExpensed={getTotalExpensed(c.name)}
                            category={c}
                            key={i}
                        />
                    ))
                ) : (
                    <p
                        className="text-center text-gray-600 w-max p-2
                        bg-gray-100 m-auto rounded-3xl px-4"
                    >
                        Nehunha categoria cadastrada.
                    </p>
                )}
            </div>
        </div>
    )
}
