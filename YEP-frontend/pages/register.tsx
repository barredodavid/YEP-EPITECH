import Head from 'next/head'
import getRawBody from 'raw-body'
import cookie from 'cookie'
import { PrismaClient } from "@prisma/client"
import { NavbarUnconnected } from 'components/navbar';

import { useRouter } from 'next/router';
import RegisterSchema from 'components/forms/RegisterSchema'
import { UserAccount } from 'helpers/api/controllers'

export default function Register({ message, connected }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Meazay - Inscription</title>
                <meta property="og:title" content="Meazay - Inscription" key="title" />
            </Head>
            {
                    (!connected) ?
                    (
                        <NavbarUnconnected />
                    ) : (
                        router.push('/home')
                    )
            }
            <RegisterSchema msg={message} />
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    if (req.method === 'POST') {
        const body   = await getRawBody(req)
        const buf    = Buffer.from(JSON.stringify(body))
        const parsed = JSON.parse(buf.toString())

        let obj = ''
        for (let c in parsed.data)
            obj += String.fromCharCode(parsed.data[c].toString())

        const str  = JSON.parse(JSON.stringify(obj))
        const json = JSON.parse(str)

        const prisma = new PrismaClient()
        const user   = new UserAccount(prisma)
        const bool   = await user.createUser(
            json.username,
            json.password,
            json.mailaddr
        )

        if (bool) {
            const TOKEN = await user.authenticate()
            await user.deleteInstance()

            res.setHeader(
                'Set-Cookie',
                cookie.serialize("mz_login", TOKEN, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 2,
                    sameSite: "strict",
                    path: "/",
                })
            )

            return {
                redirect: {
                    destination: '/home',
                    statusCode: 303
                },
                props: {
                    connected: 1
                }
            }
        } else {
            await user.deleteInstance()
            return {
                props: {
                    message: 'Impossible de créer un compte',
                    connected: 0
                },
            }
        }
    } else {
        return {
            // redirect: {
            //     destination: '/home',
            //     statusCode: 303
            // },
            props: {
                connected: 0
            }
        }
    }
}