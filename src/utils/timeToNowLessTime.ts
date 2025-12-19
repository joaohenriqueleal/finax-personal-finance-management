import type { Time } from "../types/Time"

export default function timeToNowLessTime(time: Time) : number {
    const msPerDay: number = 86_400_000
    const now = Date.now()

    if (time == '1day') return now - msPerDay
    else if (time == '1week') return now - (msPerDay * 7)
    else if (time == '1month') return now - (msPerDay * 30)
    else if (time == '1year') return now - (msPerDay * 365)
    return 0
}
