/* eslint-disable @next/next/no-head-element */
import styles from "./app.module.css"
import Link from "next/link"
import "./globals.css"
import { ResizableDiv } from "./resizableDiv"
import { Container, Bar } from "../resizer"

export type ImageProps = {
  imageURLs: string[]
  height?: number
  width?: number
  margin?: string
}

export type NavItemProps = {
  key?: number
  text: string
  href?: string
  imageProps?: ImageProps
}

const NavItemLeftList: NavItemProps[] = [

  {
    text: "",
    href:"http://www.leetcode.com",
    imageProps: {
      imageURLs: ["/orange-slice.svg", "/leetcode.svg"],
      height: 35,
      width: 35,
      margin: "7px 0px 0px 0px"
    }
  },
  {
    text: "Explore"
  },
  {
    text: "Problems"
  },
  {
    text: "Interview"
  },
  {
    text: "Contest"
  },
  //Try to maintain width height ratio of sv
]

type HeaderLayoutProps = {
  leftList: NavItemProps[]
}

export const NavItem = ({
  text,
  href,
  imageProps, 
}: NavItemProps) => {

  return (<div className="nav_item_container">
      <Link href={href ? href : "/"}>
          {imageProps ? imageProps.imageURLs.map((url) => (
              <img key={url}
                  style={{
                      "height": imageProps.height ? `${imageProps.height}px` : "1px",
                      "width" : imageProps.width ? `${imageProps.width}px` : "1px",
                      "margin": imageProps.margin ? imageProps.margin : "0px 0px 0px 0px"
                  }}
                  src={url} 
                  alt="logo"
              /> 
          )): null}
          {text}
      </Link>
  </div>);
}

const HeaderLayout = ({leftList}: HeaderLayoutProps) => {
  return (<div className={styles.layout_container}>
    <div className={styles.header_container}>
      <div className={styles.nav_bar_bue_container}>
        <div className={styles.nav_bar_container}>
          <div className={styles.nav_bar_left_container}>
            {leftList.map((li, idx) => (
              <NavItem
                key={idx}
                text={li.text}
                imageProps={li.imageProps}
                href={li.href}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>);
}

//Any code defined here will be on every page
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <main>
          <nav>
            <HeaderLayout leftList={NavItemLeftList}/>
          </nav>
          <div className={styles.main_container}>
          <Container style={{position: "relative", height: `${100}px`}}>
            <Bar 
                size={10} 
                style={{ background: '#738228', cursor: 'col-resize' }} 
                synthKey={"ID_1"}
                />
          </Container>
            
          </div>
        {children}
        </main>
      </body>
    </html>
  );
}
