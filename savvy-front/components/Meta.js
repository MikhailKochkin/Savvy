import Head from "next/head";

const Meta = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta property="og:title" content="BeSavvy App" />
      <meta
        property="og:description"
        content="Интерактивные онлайн-курсы для юристов и актуальные вакансии"
      />
      <meta property="og:image" content="/static/mini-computer.jpg" />
      <meta property="og:url" content="https://besavvy.app" />
      <meta name="twitter:card" content="/static/mini-computer.jpg" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <title>Savvy – платформа для управления юридическими знаниями</title>
    </Head>
  </>
);

export default Meta;
