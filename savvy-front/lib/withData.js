"use client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { getDataFromTree } from "@apollo/react-ssr";
import { useEffect } from "react"; // Import useEffect hook
import { useRouter } from "next/router"; // Import useRouter hook to access router object
import { endpoint, prodEndpoint } from "../config";

let apolloClient = null;

function createApolloClient(headers) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Check if running on server or client
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
        uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
        // Pass in fetchOptions or credentials as needed
        fetchOptions: {
          credentials: "include",
        },
        headers,
      }),
    ]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, headers) {
  // Create Apollo Client instance if not already created
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If page is being rendered on client-side, restore initialState
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Store Apollo Client instance once in global variable for subsequent requests
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(pageProps) {
  const router = useRouter(); // Access router object

  useEffect(() => {
    // On route change, clear Apollo Client's cache
    if (apolloClient) {
      apolloClient.cache.reset();
    }
  }, [router.asPath]);

  // Pass initial state from SSR or rehydration to Apollo Client
  return initializeApollo(pageProps.initialApolloState, {
    headers: {
      // Pass any required headers here
    },
  });
}

export async function getStaticProps(context) {
  // Call `getDataFromTree` during SSR to ensure all data is fetched
  const apolloClient = initializeApollo(null, context.req.headers);

  await getDataFromTree(<App {...pageProps} />, {
    client: apolloClient,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
