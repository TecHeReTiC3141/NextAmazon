import NextAuth, {NextAuthOptions} from "next-auth";
import prisma from "@/app/lib/db/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {Adapter} from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import {env} from "@/app/lib/env";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID!,
            clientSecret: env.GOOGLE_CLIENT_SECRET!,
        })
    ],
}

export const handler = NextAuth(authOptions);

export default handler;