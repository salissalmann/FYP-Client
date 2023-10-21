import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";

import prisma from '@/app/libs/prismadb'
import GithubProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'




export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error('Invalid Credentials')

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !user?.password) throw new Error("No User Found");
                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) throw new Error("Invalid Password");

                return user;
            }
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.JWT_SECRET as string,
}

export default NextAuth(authOptions)