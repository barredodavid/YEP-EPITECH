import Link from "next/link";
import { useRouter } from "next/router";

export function NavbarUnconnected() {
    const router = useRouter();

    return (
        <>
            <nav className="h-10v rounded">
                <div className="flex flex-initial backdrop-blur-lg flex-row">
                    <div className="flex w-1/2 text-3xl">
                        <div className="ml-4 w-1/2 mr-2 font-medium">
                            <h1
                                onClick={() => router.push('/')}
                                className="text-white"
                            ><span
                                className="text-black"
                            >MEA</span>ZAY</h1>
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-initial mt-2 text-center">
                        <div className="ml-4 w-1/3 mr-2 bg-purple-500 bg-contain rounded">
                            <Link href="/">
                                    <a>Accueil</a>
                            </Link>
                        </div>
                        <Link href="/login">
                            <a className="ml-4 w-1/3 mr-2 bg-purple-500 bg-contain rounded">Connexion</a>
                        </Link>
                        <Link href="/register">
                            <a className="ml-4 w-1/3 mr-2 bg-purple-500 bg-contain rounded">Inscription</a>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}