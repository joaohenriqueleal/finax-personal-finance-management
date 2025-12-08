interface ButtonProps {
    content: React.ReactNode
    handleClick: () => any
    extraStyles?: string
}


export default function Button({ extraStyles, content, handleClick }: ButtonProps) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                handleClick()
            }}
            className={extraStyles}
        >
            {content}
        </button>
    )
}
