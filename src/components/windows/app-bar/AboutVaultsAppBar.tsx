import TopAppBar from "../TopAppBar"
import Title from "../../ui/Title"

interface AboutVaultsAppBarProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutVaultsAppBar({ setShow }: AboutVaultsAppBarProps) {
    return (
        <TopAppBar
            title="Sobre cofres"
            setShow={setShow}
        >
            <div className="flex flex-col gap-3 text-black max-w-4xl mx-auto">
                <Title textContent="O que são os Cofres Finax?" />
                <hr className="border-2 border-brand-300" />

                <p className="pt-2">
                    Os <strong>Cofres Finax</strong> são espaços dedicados para você organizar seu dinheiro
                    de forma inteligente, separando valores para objetivos específicos sem interferir
                    no seu saldo mensal principal.
                </p>

                <p>
                    Pense neles como <strong>caixinhas virtuais</strong>: cada cofre representa um sonho,
                    meta ou necessidade — como uma viagem, reserva de emergência, compras futuras
                    ou qualquer outro planejamento financeiro.
                </p>

                <p>
                    Ao usar cofres, você ganha mais <strong>clareza, controle e disciplina</strong> sobre
                    seu dinheiro, evitando misturar gastos do dia a dia com valores que têm um propósito
                    definido.
                </p>

                <p>
                    Eles são ideais para quem deseja melhorar a <strong>gestão financeira pessoal</strong>,
                    manter o foco nos objetivos e acompanhar o progresso de cada meta ao longo do tempo.
                </p>
            </div>
        </TopAppBar>
    )
}
