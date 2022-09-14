import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {Post, Category} from "../shared/types"

import { Feed } from '../components/Feed'

type FrontProps = {
  posts: Post[]
  categories: Category[]
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
