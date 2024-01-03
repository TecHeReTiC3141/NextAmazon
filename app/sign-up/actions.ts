"use server"

import {createUser} from "@/app/lib/db/user";
import {signIn, SignInResponse} from "next-auth/react";

export async function signUpUser(formData: FormData): Promise<SignInResponse | undefined> {

    await createUser({
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
    });

    return await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
    });
}