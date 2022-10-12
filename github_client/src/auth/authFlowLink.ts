import {setContext} from "@apollo/client/link/context"
import {onError} from "@apollo/client/link/error"
import {getCode} from "./getCode"
import { ServerError } from "@apollo/client/core"
import * as keytar from "keytar"
import {RetryLink} from "@apollo/client/link/retry"
import { HttpLink } from "@apollo/client/core"
import { ApolloLink } from "@apollo/client/core"

//Make all requests to this url
const GITHUB_BASE_URL = "https://api.github.com/graphql"

const httpLink = new HttpLink({uri: GITHUB_BASE_URL})

//Cache user tokens
let token: string | null;
let tokenInvalid = false;

//https://www.apollographql.com/docs/react/api/link/apollo-link-context/#:~:text=The%20setContext%20function%20accepts%20a,executed%2C%20and%20the%20previous%20context.
//"The setContext function accepts a function that returns either an object or a
//promise, which then returns an object to set the new context of a request"

//Apollo Link helps customize flow of data between apollo client and graphQL Server
//For instance:
//  1. Log GraphQL operation for debug
//  2. Add HTTP Header to outgoing requestf
//  3. Final Link is Terminating Link, which send request with all its mods to the server

//will return a token that can be used in new Context function
const withToken = setContext(async (_, headers = {}) => {
    if (token) return {token}
    if (tokenInvalid) {
        token = await getCode()
        tokenInvalid = false;
    } else {
        token = 
            (await keytar.getPassword("github", process.env.CLIENT_ID!)) ||
            (await getCode()) 
    }
    return {token}
})


//Note how this function uses the context created by the previous
const withAuthBearer = setContext(async, )