import React, { useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
// import { SessionProvider } from "next-auth/react";
import Page from "../components/Page";
import { useApollo } from "../lib/withData";

import TagManager from "react-gtm-module";
import * as fbq from "../lib/fpixel";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps); // Initialize Apollo Client using the useApollo hook

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-WSZMCRD" });
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "d937200d-ad09-416f-87ba-4d441dcf12fd";
    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, [0]);

  return (
    // <SessionProvider session={pageProps.session}>
    <ApolloProvider client={apolloClient}>
      {" "}
      {/* Use the Apollo Client instance */}
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
    // </SessionProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the url params to the page component so we can use things like item ID in our queries
  pageProps.query = ctx.query;
  return { pageProps };
};

export default appWithTranslation(MyApp); // Remove withData hoc
