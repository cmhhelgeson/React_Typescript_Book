import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";


//Uri is provided to http link in lieu o fclient
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

//Custom links can be defined likeso
//A custom link needs to define a requestHandler that has:
//  1. Operation: The GraphQL Operation being passed through the link
//  2. A function that executes the next link in the chain
const timeStartLinkTest = new ApolloLink((operation, forward) => {
    //Operation Object
    //  1. query describing operation
    //  2. variables: map of GraphQL variables being sent
    //  3. operationName: a string name of the query if it is named
    //  4. extensions:  extensions data
    //  5. getContext: a function which returns the context of the request 
    //     (use to determine whether to perform an action)
    //  6. setContext: Takes in a new context object

    //We create a context with the start time of the operation
    operation.setContext({start: Date.now()})
    //Forward function:
    //Each link returns a forward function that passes execution to the next link in the chain
    return forward(operation);
})

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link 
  //Link will go for errorLink to httpLink to graphQLServer
  link: from([
    timeStartLinkTest, 
    errorLink, 
    httpLink]),
  cache: new InMemoryCache()
});

//Managing Context
//Get Context: Read current context
//op.setContext(newContext) = set context to newContedxt
//op.setContext((prevContext) => newContext) = modify/replace existing context

//Create a new context with the start time of the operation
const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation);
});

//Logs how long previous link took to complete
//mapping forward(operation defines what happens to data on response )
//// BEFORE (NO INTERACTION)
        //return forward(operation);

// AFTER
//return forward(operation).map((data) => {
// ...modify result as desired here...
// return data;
//});
const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = Date.now() - operation.getContext().start;
    console.log(`operation ${operation.operationName} took ${time} to complete`);
    return data;
  })
});


//Flow:
//1. Set context to start: new Date()
//2. Send request
//3. to link
//Going backwards
//3. link returns
//2. data which we ignore in this case, but we chart time the forwards flow took
//1. No defined response here, but we could easily change that by adding map
//   to the forward operation in timeStartLink, perhaps creating a time end link
const additiveLink: ApolloLink = from([
  timeStartLink,
  logTimeLink,
  httpLink
]);

//You could even encapsulate the logTimeLink as the ResponseHandler for the timeStartLink,
//since logTimeLink does not have any requestLogic

const roundTripLink = new ApolloLink((operation, forward) => {
    // Called before operation is sent to server
    operation.setContext({ start: new Date() });
  
    return forward(operation).map((data) => {
      // Called after server responds
      const time = Date.now() - operation.getContext().start;
      console.log(`Operation ${operation.operationName} took ${time} to complete`);
      return data;
    });
});

const simplifedAdditiveLink: ApolloLink = from([
    roundTripLink, 
    httpLink
])

//ADDITIVE COMPOSITION: Serially executed link

// LINK -> LINK -> LINK -> TERMINATING LINK
// LINK <- LINK -< LINK -< TERMINATING LINK

//Construction same as examples above

//DIRECTIONAL COMPOSITION

//          -> Link -> Terminating Link         
// LINK ->  ||
//          -> Link -> Terminating Link

//Directional Composition paramaters
//  1. test: a function that takes in the current operation and returns either
//     true or false depending on details
//  2. left: link to execute if test returns true
//  3. right: link to execute if test returns false



//Flow
//  1. Retry Link will go to two possible links depending on operation
//  2. Split takes function test, and links left and right
const directionalLink = new RetryLink().split(
  (operation) => operation.getContext().version === 1,
  new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
  new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
);

//STATELESS LINKS
//  Perform same operation every time

//Can also be created by extending ApolloLink and writing custom functionality