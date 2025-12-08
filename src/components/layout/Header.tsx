interface HeaderProps {
    children: React.ReactNode
    extraStyles?: string
}


export default function Header({ children, extraStyles } : HeaderProps ) {
    return (
        <header className={`${extraStyles}`} >
            {children}
        </header>
    )
}
