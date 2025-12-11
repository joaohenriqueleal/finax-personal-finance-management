import { useState } from "react"

import Button from "../../input/Button"
import TopAppBar from "../TopAppBar"
import Title from "../../ui/Title"

import { FaInfoCircle } from "react-icons/fa"


export default function AboutAppBar() {
    const [showTopAppBar, setShowTopAppBar] = useState<boolean>(false)

    return (
        <>
            <Button
                extraStyles="
                    hover:text-white/70 transition duration-300
                    rounded-full cursor-pointer
                "
                handleClick={() => setShowTopAppBar(true)}
                content={<FaInfoCircle size={24} />}
            />

            {showTopAppBar && (
                <TopAppBar setShow={setShowTopAppBar} title="Sobre">
                    <div className="flex flex-col gap-10 text-black max-w-4xl mx-auto">
                        <section>
                            <Title textContent="O que é a Finax?" extraStyles="font-bold" />
                            <div className="mt-2 mb-4 w-full h-0.5 bg-brand-300 rounded" />
                            <p className="leading-relaxed text-[17px] text-black/80">
                                A <strong>Finax</strong> é um sistema de gerenciamento
                                de finanças pessoais criado para facilitar o controle do
                                seu dinheiro no dia a dia. Com ela você registra gastos,
                                acompanha receitas, organiza categorias, define metas e
                                visualiza sua saúde financeira por meio de gráficos claros
                                e intuitivos.

                                <br /><br />
                                
                                Pensada para ser rápida, leve e prática, a Finax ajuda você
                                a entender melhor para onde o dinheiro está indo e a toma
                                 decisões mais inteligentes. O objetivo é <strong>ajudar
                                você a construir uma rotina financeira saudável</strong>,
                                com transparência, organização e simplicidade.
                            </p>
                            <ul className="list-disc pl-5 leading-relaxed text-[17px] text-black/80 mt-4">
                                <li>Histórico completo de despesas e receitas</li>
                                <li>Categorias personalizáveis</li>
                                <li>Metas e orçamentos mensais</li>
                                <li>Indicadores financeiros claros e fáceis de interpretar</li>
                                <li>Experiência otimizada para telas pequenas e grandes</li>
                            </ul>
                            <p className="mt-4 text-[15px] text-black/70">
                                Com a Finax, suas finanças ficam sempre ao alcance 
                                — organizadas, acessíveis e do seu jeito.
                            </p>
                        </section>
                    </div>
                </TopAppBar>
            )}
        </>
    )
}
