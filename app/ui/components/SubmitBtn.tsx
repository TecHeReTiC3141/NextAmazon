"use client"

import {ComponentProps} from "react";
import { useFormStatus } from "react-dom";

type SubmitBtnProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">

export default function SubmitBtn({children, className, ...props}: SubmitBtnProps) {
    const {pending} = useFormStatus();
    return (
        <button {...props} type="submit" disabled={pending} className={`btn btn-primary ${className}`}>
            {children}
            {pending && <span className="loading loading-spinner text-accent"></span>}
        </button>

    )
}