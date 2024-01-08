"use client"
import {useSearchParams} from "next/navigation";
import clsx from "clsx";
import {FaCircleInfo, FaTriangleExclamation, FaCircleXmark, FaXmark } from "react-icons/fa6";
import {FaCheckCircle} from "react-icons/fa";
import {useEffect, useState} from "react";
import {JSX} from "react";

interface Marks {
    [key: string]: JSX.Element | undefined
}

export default function MessageAlert() {
    const maxLifeTime = 10000;

    const [lifeTime, setLifeTime] = useState(maxLifeTime);

    const searchParams = useSearchParams();
    const message = searchParams.get("message"), messageType = searchParams.get("messageType");
    const marks = {
        info: <FaCircleInfo className="text-xl"/>,
        error: <FaCircleXmark className="text-xl"/>,
        warning: <FaTriangleExclamation className="text-xl"/>,
        success: <FaCheckCircle className="text-xl"/>,
    }

    useEffect(() => {
        setInterval(
            () => {
                setLifeTime(prevLiveTime => Math.max(0, prevLiveTime - 1));
            },1);
    }, []);

    useEffect(() => {
        const alertWidth = document.querySelector("#alert")?.clientWidth;
        if (!alertWidth) return;
        const alertTimeLeft = document.querySelector("#alert-left-time") as HTMLElement;
        alertTimeLeft.style.width = `${lifeTime / maxLifeTime * alertWidth}px`;

    }, [lifeTime]);

    return (
        <>
            {message &&
                <div id="alert"
                    className={clsx(["alert alert-info z-30 overflow-hidden relative w-full sm:w-[30rem] flex gap-6 items-center transition-opacity duration-300 ease-linear",
                        `alert-${messageType || "info"}`, lifeTime === 0 ? "opacity-0 pointer-events-none" : "opacity-100"])}
                    onMouseOver={() => setLifeTime(maxLifeTime)}>
                    {(marks as Marks)[messageType || "info"] || <FaCircleInfo className="text-xl"/>}
                    <p className="text-xl">{message}</p>
                    <div id="alert-left-time" className={clsx([`absolute bg-white h-1.5 bottom-0 left-0 z-40 w-full`])}></div>
                    <button className="text-red-600 text-lg absolute right-4 top-2" onClick={() => setLifeTime(0)}><FaXmark /></button>
                </div>
            }
        </>
    )
}