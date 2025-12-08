interface ImgProps {
    extraStyles?: string
    src: string
    alt: string
}


export default function Img({ extraStyles, src, alt } : ImgProps ) {
    return (
        <img
            className={`${extraStyles}`}
            src={src}
            alt={alt}
        />
    )
}
