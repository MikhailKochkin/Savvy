"use client";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { endpoint, prodEndpoint, prodEndpointRu } from "../config";

let apolloClient = null;

// Define hostname-to-endpoint mappings
const hostnameMappings = {
  "www.besavvy.app": prodEndpoint,
  "besavvy.app": prodEndpoint,
  "www.besavvy.ru": prodEndpointRu,
  "besavvy.ru": prodEndpointRu,
};

// Function to determine endpoint based on hostname
function getEndpoint(hostname) {
  return hostnameMappings[hostname] || prodEndpoint; // Fallback endpoint
}

// Create Apollo Client
function createApolloClient(headers = {}) {
  const hostname =
    typeof window === "undefined"
      ? headers.host // Server-side detection
      : window.location.hostname; // Client-side detection

  const finalProdEndpoint = getEndpoint(hostname);

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Enable SSR mode for server-side rendering
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        if (networkError) console.error(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri:
          process.env.NODE_ENV === "development" ? endpoint : finalProdEndpoint, // Pass in fetchOptions or credentials as needed
        fetchOptions: {
          credentials: "include", // Include cookies for authentication
        },
        headers,
      }),
    ]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, headers = {}) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(pageProps) {
  const router = useRouter();

  useEffect(() => {
    if (apolloClient) {
      apolloClient.cache.reset();
    }
  }, [router.asPath]);

  return initializeApollo(pageProps.initialApolloState, {
    headers: {
      // Include client-side headers if needed
    },
  });
}
