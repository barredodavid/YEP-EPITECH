import Head from 'next/head';

// pages/500.tsx
export default function Custom500() {
    return (
        <>
            <Head>
                <title>Meazay - 404</title>
                <meta property="og:title" content="Meazay - 404" key="title" />
            </Head>
            <h1>500 - Server-side error occurred</h1>
        </>
    )
}