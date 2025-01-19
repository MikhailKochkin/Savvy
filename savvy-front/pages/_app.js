import React, { useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import Page from "../components/Page";
import { useApollo } from "../lib/withData";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps); // Initialize Apollo Client using the useApollo hook

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        {" "}
        {/* Use the Apollo Client instance */}
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp); // Remove withData hoc
