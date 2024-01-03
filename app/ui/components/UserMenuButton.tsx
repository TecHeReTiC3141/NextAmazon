"use client"

import {Session} from "next-auth";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import profilePlaceholder from "@/app/assets/images/profile-pic-placeholder.png";
import {signIn, signOut} from "next-auth/react";
import Link from "next/link"

interface UserMenuButtonProps {
    session: Session | null,
}

export default function UserMenuButton({session}: UserMenuButtonProps) {
    const user = session?.user;


    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle btn-ghost">

            {user ? <Image src={user?.image || profilePlaceholder} alt={user?.name || "login"}
                           width={40} height={40} className="w-10 rounded-full"/> : <FaUser />}
            </label>
            <ul tabIndex={0} className="dropdown-content menu rounded-box menu-sm z-30 w-52 bg-base-100 p-2 shadow">
                <li>{user ?
                    <button onClick={() => signOut({ callbackUrl: "/"})}>Sign out</button>
                    : <Link href={"/login"}>Sign in</Link>
                }</li>
            </ul>
        </div>
    )
}