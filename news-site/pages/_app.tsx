import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Center } from '../components/Center'
import { GlobalStyle, theme } from '../shared/theme'


//Within this initialization function we will provide the them
//and global styles, create a default page title with head, then
//use center, header, and footer to create a layout that is
//the same across all pages
export default function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <Head>
        <title>Bleh</title>
      </Head>
      <Header />
      <main className="main">
        <Center>
          <Component {...pageProps} />
        </Center>
      </main>
      <Footer />
    </ThemeProvider>
  )
}
