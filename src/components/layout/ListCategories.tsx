import APICategories from "../../services/api/APICategories"
import CategoryItem from "../items/CategoryItem"


export default function ListCategories() {
    return (
        <div className="bg-gray-50 shadow-md
            divide-y divide-gray-200 overflow-hidden"
        >
            {APICategories.categories.map((c, i) => (
                <CategoryItem
                    category={c}
                    key={i}
                />
            ))}
        </div>
    )
}
