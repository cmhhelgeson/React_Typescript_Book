import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import categories from "../server/categories.json"

import {Post, Category} from "../shared/types"
import {fetchPosts, fetchCategories} from "../api/summary"

import { Feed } from '../components/Feed'

type FrontProps = {
  posts: Post[]
  categories: Category[]
}

//Static props are injected to a page at build time.
//Need this function to tell next to fetch data and pre-render
//the front page
export async function getStaticProps() {
  const categories = await fetchCategories();
  console.log(categories);
  const posts = await fetchPosts();
  return { props: {posts, categories}}
} 

const Front: NextPage<FrontProps> = ({posts, categories}: FrontProps) => {
  return (
    <>
    <Head>
      <title>Front page of the Internet</title>
    </Head>
    <main>
      <Feed posts={posts} categories={categories}/>
    </main>
    
    </>
  )
}

export default Front
