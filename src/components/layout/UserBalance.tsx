import Title from "../ui/Title"

import formatPrice from "../../utils/formatPrice"

interface UserBalanceProps {
    showBalance: boolean
}


export default function UserBalance({ showBalance } : UserBalanceProps ) {
    return (
        <Title
            textContent={showBalance ? formatPrice(0) :
                '*'.repeat(formatPrice(0).length)}
            extraStyles="font-bold text-xl"
        />
    )
}
