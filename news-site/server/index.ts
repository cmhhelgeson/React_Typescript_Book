import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import categories from "./categories.json"
import posts from "./posts.json"
//import { Pool } from "pg"
/* import { Request, Response } from "express"
import {Post, PostProperties} from "../shared/types"
import { formatPropsForSQL } from "../server/utils"
import { getErrorMessage } from "./error"

import localPool from "./db" */

const app = express();
app.use(cors);
app.use(bodyParser);

//const PSQL_DEFAULT_PORT = 5432
const port = 5000;

app.get("/posts", (req, res) => {
    return res.json(posts);
})

app.get("/categories", (req, res) => {
    return res.json(categories);
})

app.listen(port, () => {
    console.log(`DB is running on http://localhost:${port}`)
})

//ROUTES
//GET ALL POSTS
/* app.get("/posts", async (req, res) => {
    try {
        const allPosts = await localPool.query("SELECT * from posts");
        res.json(allPosts.rows);
    } catch (e) {
        console.error(getErrorMessage(e));
    }
})

//GET ALL CATEGORIES
app.get("/categories", async(req, res) => {
    try {
        const allCategories = await localPool.query("SELECT * from categories");
        res.json(allCategories.rows)
    } catch (e) {
        console.error(getErrorMessage(e));
    }
})

//CREATE A POST
const allPropertiesArr: PostProperties[] = [
    "id", "title", "date", 
    "category", "source", "image", "lead",
    "content"
];
const allProperties: string = formatPropsForSQL(allPropertiesArr);

app.post("/posts", async (req: Request<{}, {}, Post>, res) => {
    const {
        id, 
        title, 
        date, 
        category, 
        source, 
        image, 
        lead, 
        content
    } = req.body;
    //Placeholder that specifies this description
    //VALUES ($1) allows us to put in the variables
    //RETURNING * returns back the data you put in
    const newPost = await localPool.query(
        `INSERT INTO posts (${allProperties}) VALUES($1) RETURNING *`, [
            id, title, date, category, source, image, lead, content
        ]);
    //res.json(newPost);
    //res.json(newsPost.rows)
    res.json(newPost.rows[0]);
})

//GET ALL CATEGORIES
/* app.get("/categories", (_, res) => {
    return res.json(categories)
}) */
