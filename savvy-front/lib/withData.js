import withApollo from "next-with-apollo";
import { endpoint, prodEndpoint } from "../config";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

function createClient({ headers }) {
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri:
          process.env.NODE_ENV === "development" ? prodEndpoint : prodEndpoint,
        credentials: "include",
        headers
      })
    ])
  });
}
export default withApollo(createClient);
