import styles from "../../notes/Notes.module.css"

async function getNote(noteId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            //Since this route is dynamic, it won't cache every request
            //Incremental static regeneration
            //Tells Next to regenerate page on server if it's older than x seconds
            next: {revalidate: 10}
        }
    )
    const data = await res.json();
    return data;
}

export default async function NotePage({params}: any) {
    console.log(params);
    const note = await getNote(params.id);

    return (
        <div>
            <h1>notes/{note.id}</h1>
            <div className={styles.note}>
                <h3>{note.title}</h3>
                <h5>{note.content}</h5>
                <p>{note.created}</p>
            </div>
        </div>
    )

}