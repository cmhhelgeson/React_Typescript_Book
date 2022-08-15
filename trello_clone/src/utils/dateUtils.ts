
type DateProps = {
    day: number
    month: number
    year: number
}

type ShortMonth = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec"

type DateString = `${ShortMonth} ${number} ${number}` | "Invalid Date"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const convertToDate = ({day, month, year}: DateProps): DateString =>  {
    if (month <= 0 || month > 12) {
        return "Invalid Date"
    }
    let monthString = months[month - 1];
    return `${monthString as ShortMonth} ${day} ${year}`
}