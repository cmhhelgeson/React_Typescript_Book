export type URIString = string
export type UniqueString = string
export type EntityId = number | UniqueString

export type Category = "Technology" | "Science" | "Arts"

export type DateIsoString = string

export type Post = {
    id: number,
    title: string,
    date: DateIsoString,
    category: Category,
    source: string,
    image: string,
    lead: URIString,
    content: URIString
}



