import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Feed } from '../components/Feed'

const Front: NextPage = () => {
  return (
    <>
    <Head>
      <title>Front page of the Internet</title>
    </Head>
    <main>
      <Feed />
    </main>
    
    </>
  )
}

export default Front
