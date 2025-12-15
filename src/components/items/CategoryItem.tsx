import { useState } from "react"

import getExactDate from "../../utils/getExactDate"
import formatPrice from "../../utils/formatPrice"

import type { Category } from "../../types/Category"
import { FaPen, FaTrash } from "react-icons/fa"

import DeleteCategoryAppBar from "../windows/app-bar/DeleteCategoryAppBar"
import EditCategoryAppBar from "../windows/app-bar/EditCategoryAppBar"
import TopAppBar from "../windows/TopAppBar"

interface CategoryItemProps {
    category: Category
}


export default function CategoryItem({ category }: CategoryItemProps) {
    const [showTABMoreDetails, setShowTABMoreDetails] = useState<boolean>(false)
    const [showTABDeleteCategory, setShowTABDeleteCategory] = useState(false)
    const [showTABEditCategory, setShowTABEditCategory] = useState(false)

    const showTABEC = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setShowTABEditCategory(true)
    }

    const showTABDC = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setShowTABDeleteCategory(true)
    }

    return (
        <>
            <div
                className="
                    flex items-center justify-between px-4 py-3 hover:bg-gray-100
                    transition duration-300 cursor-pointer
                "
                onClick={() => setShowTABMoreDetails(true)}
            >
                <div className="flex flex-col">
                    <span className="text-xl text-gray-800">
                        {category.name}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="
                            p-2 cursor-pointer text-gray-500 hover:text-blue-600
                            hover:bg-blue-100 rounded-lg transition"
                        onClick={(e) => showTABEC(e)}
                    >
                        <FaPen />
                    </button>
                    <button
                        className="
                            p-2 cursor-pointer text-gray-500 hover:text-red-600
                            hover:bg-red-100 rounded-lg transition"
                        onClick={(e) => showTABDC(e)}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            {showTABMoreDetails && (
                <TopAppBar
                    title={`Mais detalhes de ${category.name}`}
                    setShow={setShowTABMoreDetails}
                >
                    <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                        <div className="flex flex-col gap-10">
                            <div
                                className="relative rounded-2xl bg-linear-to-r
                                    from-gray-900 to-gray-800 p-6 text-white
                                    shadow-lg"
                            >
                                <span
                                    className="text-xs uppercase tracking-widest
                                        text-gray-400"
                                >
                                    Categoria
                                </span>
                                <h2 className="mt-1 text-3xl font-bold">
                                    {category.name}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    className="rounded-xl bg-white p-5 shadow-md
                                        border border-gray-200"
                                >
                                    <span
                                        className="text-xs uppercase tracking-wide
                                            text-gray-400"
                                    >
                                        Descrição
                                    </span>
                                    <p
                                        className="mt-2 text-base text-gray-700
                                            leading-relaxed"
                                    >
                                        {category.description || "Sem descrição"}
                                    </p>
                                </div>

                                <div
                                    className="rounded-xl bg-white p-5 shadow-md
                                        border border-gray-200"
                                >
                                    <span
                                        className="text-xs uppercase tracking-wide
                                            text-gray-400"
                                    >
                                        Meta mensal
                                    </span>
                                    <p
                                        className="mt-2 text-2xl font-bold
                                            text-green-600"
                                    >
                                        {formatPrice(category.monthGoal)}
                                    </p>
                                </div>

                                <div
                                    className="rounded-xl bg-white p-5 shadow-md
                                        border border-gray-200 md:col-span-2"
                                >
                                    <span
                                        className="text-xs uppercase tracking-wide
                                            text-gray-400"
                                    >
                                        Criado em
                                    </span>
                                    <p className="mt-2 text-base text-gray-700">
                                        {getExactDate(category.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TopAppBar>
            )}
            {showTABDeleteCategory && (
                <DeleteCategoryAppBar
                    setShow={setShowTABDeleteCategory}
                    category={category}
                />
            )}
            {showTABEditCategory && (
                <EditCategoryAppBar
                    setShow={setShowTABEditCategory}
                    category={category}
                />
            )}
        </>
    )
}
