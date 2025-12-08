interface FormProps {
    children: React.ReactNode
    extraStyles?: string
}


export default function Form({ children, extraStyles } : FormProps ) {
    return (
        <form className={`${extraStyles} flex flex-col`} >
            {children}
        </form>
    )
}
