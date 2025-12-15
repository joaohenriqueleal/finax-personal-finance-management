import { useState } from "react"

import ListCategories from "../../layout/ListCategories"
import CategoriesGoal from "../../layout/CategoriesGoal"
import NewCategoryAppBar from "./NewCategoryAppBar"
import Button from "../../input/Button"
import TopAppBar from "../TopAppBar"

interface CategoriesAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CategoriesAppBar({ setShow } : CategoriesAppBarProps ) {
    const [showTABCreateNewCategory, setShowTABCreateNewCategory] = useState<boolean>(false)

    return (
        <TopAppBar
            title="Categorias"
            setShow={setShow}
        >
            <div
                className="flex flex-col gap-12 w-full text-black max-w-4xl mx-auto"
            >
                <Button
                    extraStyles="p-4 bg-brand-300 text-white font-bold shadow-[2px_2px_green]
                        hover:shadow-none hover:bg-brand-200 transition duration-300
                        cursor-pointer"
                    handleClick={() => setShowTABCreateNewCategory(true)}
                    content="Criar nova categoria"
                />
                <ListCategories />
                <CategoriesGoal />
            </div>
            {showTABCreateNewCategory && (
                <NewCategoryAppBar setShow={setShowTABCreateNewCategory} />
            )}
        </TopAppBar>
    )
}
