import React, { useEffect } from "react";
// import Script from "next/script";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import withData from "../lib/withData";
import TagManager from "react-gtm-module";
import * as fbq from "../lib/fpixel";

function MyApp({ Component, apollo, pageProps }) {
  const router = useRouter();

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
    //   !(function () {
    //     function t(t, e) {
    //       return function () {
    //         window.carrotquestasync.push(t, arguments);
    //       };
    //     }
    //     if ("undefined" == typeof carrotquest) {
    //       var e = document.createElement("script");
    //       (e.type = "text/javascript"),
    //         (e.async = !0),
    //         (e.src = "//cdn.carrotquest.app/api.min.js"),
    //         document.getElementsByTagName("head")[0].appendChild(e),
    //         (window.carrotquest = {}),
    //         (window.carrotquestasync = []),
    //         (carrotquest.settings = {});
    //       for (
    //         var n = [
    //             "connect",
    //             "track",
    //             "identify",
    //             "auth",
    //             "oth",
    //             "onReady",
    //             "addCallback",
    //             "removeCallback",
    //             "trackMessageInteraction",
    //           ],
    //           a = 0;
    //         a < n.length;
    //         a++
    //       )
    //         carrotquest[n[a]] = t(n[a]);
    //     }
    //   })(),
    //     carrotquest.connect("46882-c19ef48fe94883ff348545ab97");
  });

  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
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

export default withData(MyApp);
