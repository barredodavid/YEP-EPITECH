import * as jwt from "jsonwebtoken"
import { readFileSync } from 'fs'
import { PrismaClient } from "@prisma/client"
import { UserAccount } from 'helpers/api/controllers'

export function create_jwt(username) {
    const BODY = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        username: username
    }

    try {
        const KEY = {
            key: readFileSync(process.env.JWT_PRIVATE_KEY,
                { encoding: 'utf-8', flag: 'r' }
            ),
            passphrase: process.env.JWT_PASSPHRASE
        }
        const OPTIONS = { algorithm: 'RS512' }
        const TOKEN   = jwt.sign(BODY, KEY, OPTIONS)

        return TOKEN
    } catch (e) {
        console.error(e)
    }
}

export function verify_jwt(token) {
    try {
        const KEY = readFileSync(process.env.JWT_PUBLIC_KEY,
            { encoding: 'utf-8', flag: 'r' }
        )
        const OPTIONS  = { algorithms: ['RS512']}
        const verified = jwt.verify(token, KEY, OPTIONS) || undefined
        const data     = JSON.parse(JSON.stringify(verified))

        return data
    } catch (e) {}
}

export async function isConnected(req) {
    try {
        const prisma = new PrismaClient()
        const token  = req.cookies.iys_login
        const user   = new UserAccount(prisma)
        const check  = user.verify(token)

        const bool = (check) ? (await user.compare(check))
                        ? true
                        : false
                    : false

        await user.deleteInstance()

        return bool
    } catch (e) {
        console.error(e)
    }
}