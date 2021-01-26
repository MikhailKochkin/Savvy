import Head from "next/head";

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
    <title>BeSavvy – интерактивные онлайн-курсы для юристов</title>
  </Head>
);

export default Meta;
