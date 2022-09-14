import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { Pool } from "pg"
import { Request, Response } from "express"
import {Post, PostProperties} from "../shared/types"
import { formatPropsForSQL } from "./utils"

import localPool from "./db"


const categories = require("./categories.json")
const posts = require("./posts.json")
const app = express();
app.use(cors);
app.use(bodyParser);

const port = 4000;

const PSQL_DEFAULT_PORT = 5432

//ROUTES

//GET ALL POSTS
app.get("/posts", async (req, res) => {
    return res.json(posts)
})


const allPropertiesArr: PostProperties[] = [
    "id", "description", "title", "date", 
    "category", "source", "image", "lead",
    "content"
];
const allProperties: string = formatPropsForSQL(allPropertiesArr);

app.post("/posts", async (req: Request<{}, {}, Post>, res) => {
    const {
        id, 
        description, 
        title, 
        date, 
        category, 
        source, 
        image, 
        lead, 
        content
    } = req.body;
    const newPost = await pool.query(
        `INSERT INTO posts (${allProperties})`
    )
})

//GET ALL CATEGORIES
/* app.get("/categories", (_, res) => {
    return res.json(categories)
}) */

app.listen(port, () => 
    console.log('DB is running on http://localhost:${port}!')
)