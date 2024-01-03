"use client"

import {redirect} from "next/navigation";
import {signIn} from "next-auth/react";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation'


export default function CredentialsForm() {

    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        setError("");
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);

        const signInResponse = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (signInResponse && !signInResponse.error) {
            router.push("/");
        } else {
            setError("Check your email and password, maybe they are wrong");
        }
    }

    return (
        <form
            className="w-full mt-8 text-xl font-semibold flex flex-col"
            onSubmit={ev => handleSubmit(ev)}
        >
            {error && (
                <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-4 mb-4 input input-bordered  rounded-md"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-4 mb-4 input input-bordered  rounded-md"
            />

            <button
                type="submit"
                className="w-full h-12 px-6 mt-4 text-lg btn btn-primary"
            >
                Log in
            </button>
        </form>
    )

}