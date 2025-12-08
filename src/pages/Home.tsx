interface HomeProps {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Home({ setAuth } : HomeProps ) {
    return (
        <h1>Home</h1>
    )
}
