export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp)

    const day = date.getDate()
    const year = date.getFullYear()

    const months = [
        "jan", "fev", "mar", "abr", "mai", "jun",
        "jul", "ago", "set", "out", "nov", "dez"
    ]

    const monthAbbrev = months[date.getMonth()]

    return `${day} ${monthAbbrev} ${year}`
}
