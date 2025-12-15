export default function formatPrice(value: number) {
    return `R$ ${Number(value)
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }`
}
