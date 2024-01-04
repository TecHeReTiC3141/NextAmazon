import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/app/lib/db/prisma";
import {PrismaClient} from "@prisma/client";
import {Adapter} from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import {env} from "@/app/lib/env";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {mergeAnonymousCartIntoUsersCart} from "@/app/lib/db/cart";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@mail.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {email: credentials.email},
                });
                if (user && await bcrypt.compare( credentials.password, user.password || "")) {
                    const {id,  password, ...userFields} = user;
                    console.log("logged", user);
                    return user;
                }
                return null;
            }
        }),
    ],
    callbacks: {
        session({session, user}) {
            session.user.id = user.id;
            return session;
        },
    },
    events: {
        async signIn({user}) {
            await mergeAnonymousCartIntoUsersCart(user.id);
        }
    }
}