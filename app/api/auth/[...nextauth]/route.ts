import NextAuth, {NextAuthOptions} from "next-auth";
import prisma from "@/app/lib/db/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {Adapter} from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from "@/app/lib/db/user";
import {env} from "@/app/lib/env";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
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
                console.log("found user", user, await bcrypt.compare( credentials.password, user?.password || "",));
                if (user && await bcrypt.compare( credentials.password, user.password || "")) {
                    const {id,  password, ...userFields} = user;
                    console.log("logged", user);
                    return user;
                }
                return null;
            }
        })
    ],
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};

