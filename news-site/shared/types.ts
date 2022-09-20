import Post from "../pages/post/[id]"

export type URIString = string
export type UniqueString = string
export type EntityId = number | UniqueString

export type CategoryString = "Technology" | "Science" | "Arts"
export type Category = {
    id: EntityId, 
    text: CategoryString
}

export type DateIsoString = string 

//Takes in types T, U, and optional Y N types
//1st. Function G will extend T
//2nd. But will the first definition of G extend the functionality
//of U?
type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

declare const exactType: <T, U>(
    draft: T & IfEquals<T, U>,
    expected: U & IfEquals<T, U>
) => IfEquals<T, U>

export type Post = {
    id: number,
    title: string,
    date: DateIsoString,
    category: CategoryString,
    source: string,
    image: string,
    lead: URIString,
    content: URIString
}

const PostTypeTemplate = {
    id: "",
    title: "", 
    date: "",
    category: "",
    source: "",
    image: "",
    lead: "",
    content: "",
}

type PostTypeTemplateProperties = keyof typeof PostTypeTemplate
type PostTypeProperties = keyof Post

type PropertiesEqual = IfEquals<PostTypeProperties, PostTypeTemplateProperties, "same", "different">
const check: PropertiesEqual = "same"

export type PostProperties = PostTypeTemplateProperties;

/*const postTypeProperties: string[] = [];
Object.keys(PostTypeTemplate).forEach((prop) => PostProperties.push(prop.toString() as PostTypeProperties));
console.log(postTypeProperties); */

/*export type PostProperties = PostTypeProperties; */




