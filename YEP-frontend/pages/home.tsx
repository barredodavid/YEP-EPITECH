import { useRouter } from 'next/router';
import { NavbarConnected } from 'components/navbar';
import Head from 'next/head';

export default function Home({ connected }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Meazay - Home</title>
                <meta property="og:title" content="Meazay - Home" key="title" />
            </Head>
            {
                    (!connected) ?
                    (
                        router.push('/login')
                    ) : (
                        <NavbarConnected />
                    )
            }
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            message: '',
            connected: 1
        }
    }
}