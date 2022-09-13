import React from "react";
import { ServerStyleSheet } from "styled-components";

//Next Script is a component with a context and associated elements
//All elements below save Document Context are required for a
//Nextjs application to run
import Document, {
    Html, 
    Head,
    Main,
    NextScript,
    DocumentContext
} from "next/document"

const PermanentMarkerFontRef: string =  "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"

export default class MyDocument extends Document {


    /* This function collects props passed in from the serverstylesheet
    * These Props are given to the documentcontext so each component
    * has access to them within the Next app.
    * Asynchronously fetches data that populates props args
    */
    static async getInitialProps(ctx: DocumentContext) {
        //Object to collect our style applications
        const sheet: ServerStyleSheet = new ServerStyleSheet();
        //object used to override original render
        const originalRender = ctx.renderPage;

        try {
            //Render the original pages and collect all the styled 
            //components we created from App
            ctx.renderPage = () => 
                originalRender({
                    enhanceApp: (App) => (props) => 
                        sheet.collectStyles(<App {...props} />)
                })
            //Collect original initial props
            const initialProps = await Document.getInitialProps(ctx);
            /* Returns: 
            * 1. The original initial props
            * 2. The styles of both the original initial props
            *    and the props collected into the ServerStyleSheet, 
            *    collapsed into a single style element available to
            *    access on the server
            */
            return {
                ...initialProps, 
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            //Makes style sheet available for garbage collection
            //and prevents us from adding new properties to it
            sheet.seal()
        }


    }


    /* Notes: this.props.styles = Props collected by ServerStyleSheet 
    * Main: renders pages
    * NextScript: Service component that allows Next to function
    */
    render() {
        return (
            <Html>
                <Head>
                    <meta 
                        name="description"
                        content="News Feed"
                    />
                    <link 
                        href={PermanentMarkerFontRef}
                        rel="stylesheet"
                    />
                    {this.props.styles}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )

    }

}
