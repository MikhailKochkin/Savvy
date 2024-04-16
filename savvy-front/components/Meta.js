import Head from "next/head";
import * as fbq from "../lib/fpixel";

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta property="og:title" content="BeSavvy" />
    <meta
      property="og:description"
      content="Interactive training for lawyers"
    />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1713007750/Group_1407.png"
    />
    <meta property="og:url" content="https://besavvy.app" />
    <meta
      name="twitter:card"
      content="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1713007750/Group_1407.png"
    />

    <link rel="shortcut icon" href="/static/favicon2.ico" />
    <title>Interactive simulators for lawyers</title>
    <script
      async
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
      }}
    />
  </Head>
);

export default Meta;
