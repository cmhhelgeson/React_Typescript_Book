import fetch from "node-fetch"
import { Post, Category } from "../shared/types"
import { config } from "./config"
import axios from "axios"

export async function fetchPosts(): Promise<Post[]> {
  const promise = axios.get(`${config.baseUrl}/posts`)
  return (await promise).data as Promise<Post[]>
}

export async function fetchCategories(): Promise<Category[]> {
  const promise = axios.get(`${config.baseUrl}/categories`);
  const categoryData = (await promise).data;
  return (await promise).data as Promise<Category[]>
}
