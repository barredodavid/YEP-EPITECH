import 'styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <div className="bg-cat-computer overflow-auto bg-scroll bg-cover w-full h-100v">
                <main>
                    <Component {...pageProps} />
                </main>
            </div>
        </>
    )
}