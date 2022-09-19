import Link from "next/link";
import Image from "next/image";
import {Card, Figure, Title, Excerpt} from "./PostCardStyle"

import {Post} from "../../shared/types"


type PostCardProps = {
    post: Post
}

//Pass href passes href prop further to the child of Link
export const PostCard = ({post}: PostCardProps) => {
    return (
        <Link href={`post/${post.post_id}`} passHref>
            <Card>
                <Figure>
                    <Image alt={post.title} src={post.image}/>
                </Figure>
                <Title>{post.title}</Title>
                <Excerpt>{post.lead}</Excerpt>
            </Card>
        </Link>
    )
}