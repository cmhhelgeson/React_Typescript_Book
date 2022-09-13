import { useRouter } from "next/router";



const Post = () => {
    //pathname is the path of the page
    //query is a query string containing id of current post
    const {pathname, query} = useRouter();
    return (
        <div>
            Pathname: {pathname};<br/>
            Post Id: {query.id}
        </div>
    );
}

export default Post;