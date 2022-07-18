import Link from "next/link";

export function NavbarConnected() {
    return (
        <>
            <nav className="h-10v bg-slate-500 rounded">
                <div className="flex flex-initial backdrop-blur-lg flex-row-reverse">
                    <div className="flex flex-initial mt-2">
                        <Link href="/" >
                            <a className="ml-4 mr-2">Accueil</a>
                        </Link>
                        <Link href="/login">
                            <a className="ml-4 mr-2">Connexion</a>
                        </Link>
                        <Link href="/register">
                            <a className="ml-4 mr-2">Inscription</a>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}