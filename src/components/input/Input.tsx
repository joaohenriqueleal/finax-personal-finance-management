interface InputProps {
    handleChange: React.Dispatch<React.SetStateAction<any>>
    containerStyles?: string
    inputStyles?: string
    labelStyles?: string
    placeholder: string
    label?: string
    type: string
    id: string
}


export default function Input(
    {
        type, id, label, placeholder, handleChange, inputStyles,
        labelStyles, containerStyles
    } : InputProps ) {
    return (
        <div
            className={`${containerStyles} flex flex-col gap-2`}
        >
            {label && (
                <label
                    className={`${labelStyles}`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                onChange={(e) => handleChange(e.target.value)}
                className={`${inputStyles}`}
                placeholder={placeholder}
                type={type}
                id={id}
            />
        </div>
    )
}
