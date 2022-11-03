//Components are server components by default which means they get rendered on server
import Link from "next/link";
import styles from "./Notes.module.css"
import CreateNote from "./CreateNote"

async function getNotes() {
    //cache options
    //no-store: the browser fetches the resource from the server
    //  without looking in the cache, will not update cache
    //no-cache: The browser looks for a matching request in its
    //  http cache. If a match exists,
    //  1: If resource has changed, download resource from server
    //  2: If resource has not changed, download from cache.
    //force-cache: Browser looks for matching request in cache
    //  and always returns from the cache.
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30',
        {cache: 'no-cache'}
    );
    const data = await res.json();
    console.log(data)
    return data?.items as any[]
}

const Note = ({note}:any) => {
    const {id, title, content, created} = note || {};
    return (
        <Link href={`/notes/${id}`}>
            <div className={styles.note}>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    );
}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div>
            <div className={styles.grid}>
                {notes?.map((note, idx) => {
                    return <Note key={note.id} note={note} />
                })}
            </div>
            <CreateNote />
        </div>
    )
}

