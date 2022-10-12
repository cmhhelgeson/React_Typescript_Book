import http from "http"
import fs from "fs"
import "cross-fetch/polyfill"
import fetch from "cross-fetch"
import open from "open"
import * as url from "url"
import * as keytar from "keytar"
//FormDaa allows users to construct key/value pairs representing form fields and their
//values. 
const FormData = require("form-data")

const PORT = 3000;

export const getCode = (): Promise<string> => {
    //Use resolve function to retun code from Github
    return new Promise((resolve) => {
        //Read HTML from file
        fs.readFile("./src/auth/auth.html", (err, html) => {
            console.log(err);
            //lAUNCH HTTP SERVER that will serve HTML for Terminal
            http.createServer(async (req, res) => {
                if (!req.url) {
                    return;
                }
                //Response received on return URL
                const {code} = url.parse(req.url, true).query
                res.writeHead(200, {"Content-Type": "text/html"})
                res.write(html);
                res.end();
                
                const data = new FormData();
                //append a new value inside an existing or new key
                data.append("client_id", process.env.CLIENT_ID!);
                data.append("client_secret", process.env.CLIENT_SECRET!)
                data.append("code", code);
                data.append("state", "abc");
                data.append("redirect_uri", "http://localhost:3000");

                //Fetch data using params
                const {access_token} = await fetch(
                    "https://github.com/login/oauth/access_token", {
                        method: "POST",
                        body: data,
                        headers: {
                            Accept: "application/json"
                        }
                    }                  
                ).then((res) => res.json())
                
                await keytar.setPassword(
                    "github",
                    process.env.CLIENT_ID!,
                    access_token
                )
                resolve(access_token)
            }).listen(PORT);
        })
        open(`https://github.com/login/oauth/authorize?client_id=
            ${process.env.CLIENT_ID}&scope=user%20read:org%20public_repo%
            20admin:enterprise&state=abc`
        )     
    })
}