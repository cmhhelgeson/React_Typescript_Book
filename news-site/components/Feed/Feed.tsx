import { Section } from "../Section";

import {Post, Category} from "../../shared/types"

type FeedProps = {
    posts: Post[]
    categories: Category[]
}


export const Feed = ({posts, categories}: FeedProps) => {
    return (
        <>
            {categories.map((category) => {
                const categoryPosts = posts.filter(
                    (post) => post.category === category.text
                )
                return (
                    <Section 
                        key={category.id}
                        title={category.text}
                        posts={categoryPosts}
                    />
                )
            })}
        </>
    )
}