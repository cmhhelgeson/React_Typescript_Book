import fetch from "node-fetch";
import {Post, Category} from "../shared/types"
import { config } from "./config"
import axios from "axios"

export async function fetchPosts(): Promise<Post[]> {
    const promise = axios.get(`${config.baseUrl}/posts`);
    return (await promise).data
}

export async function fetchCategories(): Promise<Category[]> {
    const promise = axios.get(`${config.baseUrl}/categories`)
    return (await promise).data
}

/* export async function fetchCategories(): Promise<Category[]> {
    const res = await fetch(`${config.baseUrl}/categories`);
    return await res.json() as Promise<Category[]>
} */