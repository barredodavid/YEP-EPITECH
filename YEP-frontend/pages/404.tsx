import Head from 'next/head';

// pages/404.tsx
export default function Custom404() {
    return (
        <>
            <Head>
                <title>Meazay - 404</title>
                <meta property="og:title" content="Meazay - 404" key="title" />
            </Head>
            <h1>404 - Page Not Found</h1>
        </>
    )
}