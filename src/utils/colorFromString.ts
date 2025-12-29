function hashString(str: string): number {
    let hash = 0

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    return hash
}

export function colorFromString(name: string): string {
    const hash = hashString(name)

    const r = (hash >> 0) & 255
    const g = (hash >> 8) & 255
    const b = (hash >> 16) & 255

    return `rgb(${r}, ${g}, ${b})`
}

export function darkenColor(rgb: string, factor = 0.8): string {
    const [r, g, b] = rgb
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map(Number)

    return `rgb(
        ${Math.floor(r * factor)},
        ${Math.floor(g * factor)},
        ${Math.floor(b * factor)}
    )`
}
