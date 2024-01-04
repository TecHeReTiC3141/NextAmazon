import {Prisma} from "@prisma/client";
import prisma from "@/app/lib/db/prisma";

import bcrypt from 'bcrypt';

export type User = Prisma.UserGetPayload<{}>;

export interface UserCredentials {
    name: string,
    password: string,
    email: string,
}

export async function createUser({name, email, password}: UserCredentials): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data:
            {
                name,
                email,
                password: hashedPassword,
            },
    });
    return user;
}