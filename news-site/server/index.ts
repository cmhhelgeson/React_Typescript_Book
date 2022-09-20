import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { Post, Category, PostProperties} from "../shared/types"
import { Pool } from "pg"
import { Request, Response } from "express"
import { formatPropsForSQL } from "./utils"
import { getErrorMessage } from "./error"
import localPool from "./db"

const categories = require("./categories.json")
const posts = require("./posts.json")
const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 4000


//GET FROM LOCAL JSON
/*app.get("/posts", async(req, res) => {
  return res.json(posts)
})

app.get("/posts/:id", (req, res) => {
  const wantedId = String(req.params.id)
  const post = posts.find(({ id }: Post) => String(id) === wantedId)
  return res.json(post)
})

app.get("/categories", async(req, res) => {
  return res.json(categories)
})

app.listen(port, () =>
  console.log(`DB is running on http://localhost:${port}!`)
) */


//GET FROM PSQL DATABASE
//GET ALL POSTS
app.get("/posts", async (req, res) => {
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
        const allCategories = await localPool.query("SELECT * from categories")
        console.log(allCategories.rows);
        res.json(allCategories.rows)
    } catch (e) {
        console.error(getErrorMessage(e));
    }
})

app.listen(port, () => {
  console.log(`DB is running on http://localhost:${port}!`)
})

