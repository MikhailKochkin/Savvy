import Head from 'next/head';
// import YM from './YM';
// import ym from 'react-yandex-metrika';

const Meta = () => (
    <>
    <Head>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>Savvy 2.0</title>
    </Head>
    {/* <YM/>
    {ym('hit', '/cart')}
    {ym('reachGoal', 'whateverGoal', {awesomeParameter: 42})} */}
    </>
)

export default Meta;