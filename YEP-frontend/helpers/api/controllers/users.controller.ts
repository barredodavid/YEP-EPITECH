import { User } from "./interfaces/"
import { PrismaClient } from "@prisma/client"
import * as argon2 from "argon2"
import * as Meax from "helpers/lib"

export class UserAccount implements User
{
    _id          : number;
    _username    : string;
    _passwd      : string;
    _mail        : string;
    _firstName   : string;
    _lastName    : string;
    _birthDate   : Date;
    _biography   : string;
    _rank        : number;
    _staffRole   : number;
    _profileName : string;
    _cookie      : string;
    _userBDD     : object;
    _prismaClient: PrismaClient;

    constructor(prisma?: PrismaClient) {
        this._prismaClient = prisma
    }

    // GET
    getId() {
        return this._id;
    }

    getUsername() {
        return this._username;
    }

    getPassword() {
        return this._passwd;
    }

    getMail() {
        return this._mail;
    }

    getFirstName() {
        return this._mail;
    }

    getLastName() {
        return this._lastName;
    }

    getBirthDate() {
        return this._birthDate;
    }

    getBiography() {
        return this._biography;
    }

    getRank() {
        return this._rank;
    }

    getStaffRole() {
        return this._staffRole;
    }

    getProfileName() {
        return this._profileName;
    }

    getCookie() {
        return this._cookie;
    }

    getUserBDD() {
        return this._userBDD;
    }

    getPrismaClient() {
        return this._prismaClient;
    }

    // SET
    setId(id: number) {
        this._id = id;
    }

    setUsername(username: string) {
        this._username = username;
    }

    setPassword(passwd: string) {
        this._passwd = passwd;
    }

    setMail(mail: string) {
        this._mail = mail;
    }

    setFirstName(firstName: string) {
        this._firstName = firstName;
    }

    setLastName(lastName: string) {
        this._lastName = lastName;
    }

    setBirthDate(birthDate: Date) {
        this._birthDate = birthDate;
    }

    setBiography(biography: string) {
        this._biography = biography;
    }

    setRank(rank: number) {
        this._rank = rank;
    }

    setStaffRole(staffRole: number) {
        this._staffRole = staffRole;
    }

    setProfileName(profileName: string) {
        this._profileName = profileName;
    }

    setCookie(cookie: string) {
        this._cookie = cookie;
    }

    setUserBDD(userBDD: object) {
        this._userBDD = userBDD;
    }

    // OTHER
    modifyUser(id: number) {
        return true;
    }

    deleteUser(id: number) {
        return true;
    }

    async createUser(username: string, passwd: string, mail: string): Promise<boolean> {
        try {
            const prisma  = this.getPrismaClient()
            let isCreated = null

            const userExist = await prisma.users_tbl.findFirst({
                where: {
                    OR: [
                        {
                            usr_username: (username && username.length <=20) ?
                                username : '',
                        },
                        {
                            usr_mail: (mail && mail.length <= 50) ?
                                mail : ''
                        }
                    ]
                }
            })
            const usrEx = JSON.parse(JSON.stringify(userExist))
            const usr   = (usrEx) ? true : false

            if (!usr) {
                isCreated = await prisma.users_tbl.create({
                    data: {
                        usr_username: username,
                        usr_password: await argon2.hash(passwd),
                        usr_mail: mail,
                        usr_permissions: false,
                    },
                })

                this.setUserBDD(isCreated)

                return isCreated
            } else {
                return isCreated = false
            }
        } catch (e) {
            console.error(e)
        }
    }

    async loginUser(mail: string, passwd: string): Promise<boolean> {
        try {
            const prisma  = this.getPrismaClient()
            let isLogged  = null

            const exist   = await prisma.users_tbl.findFirst({
                where: {
                    usr_mail: (mail && mail.length <= 50) ?
                        mail : ''
                }
            })

            const user  = JSON.parse(JSON.stringify(exist))
            const check = (user) ? true : false

            if (check && passwd) {
                this.setUserBDD(exist)

                return isLogged =
                    (await argon2.verify(user.usr_password, passwd))
                        ? true : false
            } else {
                return isLogged = false
            }
        } catch (e) {
            console.error(e)
        }
    }

    async authenticate(): Promise<string> {
        try {
            const USER   = this.getUserBDD()
            const json   = JSON.parse(JSON.stringify(USER))
            const TOKEN  = Meax.create_jwt(json.usr_username)

            const data   = this.verify(TOKEN)
            const body   = JSON.parse(JSON.stringify(data))
            const prisma = this.getPrismaClient()

            await prisma.users_tbl.update({
                where: {
                    usr_id: json.usr_id
                },
                data: {
                    usr_token_iat: body.iat,
                    usr_token_exp: body.exp
                }
            })

            return TOKEN
        } catch (e) {
            console.error(e)
        }
    }

    verify(token: string): Promise<string> {
        return Meax.verify_jwt(token)
    }

    async compare(token: string): Promise<boolean> {
        const prisma = this.getPrismaClient()
        const data  = JSON.parse(JSON.stringify(token))
        const user = await prisma.users_tbl.findFirst({
            where: {
                usr_username: data.username
            }
        })

        const JWT_IAT = data.iat
        const JWT_EXP = data.exp
        const DB_IAT  = user.usr_token_iat
        const DB_EXP  = user.usr_token_exp

        return (JWT_EXP === DB_EXP && JWT_IAT === DB_IAT)
            ? true : false
    }

    async deleteInstance(): Promise<void> {
        const prisma = this.getPrismaClient()
        await prisma.$disconnect()
    }
}