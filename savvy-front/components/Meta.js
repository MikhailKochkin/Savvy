import Head from "next/head";
import * as fbq from "../lib/fpixel";

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta property="og:title" content="BeSavvy App" />
    <meta
      property="og:description"
      content="Интерактивные онлайн-курсы для юристов"
    />
    <meta property="og:image" content="/computer_mini.jpg" />
    <meta property="og:url" content="https://besavvy.app" />
    <meta name="twitter:card" content="/computer_mini.jpg" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
      rel="stylesheet"
    />
    <title>BeSavvy – интерактивные онлайн-курсы для юристов</title>
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
