import { PrismaClient } from "@prisma/client"

export interface User
{
    _id         : number;
    _username   : string;
    _passwd     : string;
    _mail       : string;
    _firstName  : string;
    _lastName   : string;
    _birthDate  : Date;
    _biography  : string;
    _rank       : number;
    _staffRole  : number;
    _profileName: string;
    _cookie     : string;
    _userBDD    : object;

    // GET
    getId(): number;
    getUsername(): string;
    getPassword(): string;
    getMail(): string;
    getFirstName(): string;
    getLastName(): string;
    getBirthDate(): Date;
    getBiography(): string;
    getRank(): number;
    getStaffRole(): number;
    getProfileName(): string;
    getCookie(): string;
    getUserBDD(): object;
    getPrismaClient(): PrismaClient;

    // SET
    setId(id: number): void;
    setUsername(username: string): void;
    setPassword(passwd: string): void;
    setMail(mail: string): void;
    setFirstName(firstName: string): void;
    setLastName(lastName: string): void;
    setBirthDate(birthDate: Date): void;
    setBiography(biography: string): void;
    setRank(rank: number): void;
    setStaffRole(staffRole: number): void;
    setProfileName(profileName: string): void;
    setCookie(cookie: string): void;
    setUserBDD(userBDD: object): void;

    // OTHER
    modifyUser(id: number): boolean;
    deleteUser(id: number): boolean;
    createUser(username: string, passwd: string, mail: string): Promise<boolean>;
    loginUser(mail: string, passwd: string): Promise<boolean>;
    verify(token: string): Promise<string>;
    deleteInstance(): Promise<void>;
}