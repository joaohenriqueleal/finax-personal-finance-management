interface TitleProps {
    extraStyles?: string
    textContent: string
}


export default function Title({ textContent, extraStyles } : TitleProps ) {
    return (
        <h1 className={`${extraStyles} text-3xl`} >
            {textContent}
        </h1>
    )
}
