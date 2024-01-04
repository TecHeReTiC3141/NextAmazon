"use client"

import type {JSX} from "react";
import Link from "next/link";
import clsx from "clsx";
import {usePathname, useSearchParams} from "next/navigation";

interface PaginationBarProps {
    currentPage: number,
    totalPageNumber: number,
}

export default function PaginationBar({currentPage, totalPageNumber}: PaginationBarProps) {

    const pathname = usePathname(), searchParams = useSearchParams();
    console.log("pathname:", pathname, searchParams.toString());


    const maxPage = Math.min(totalPageNumber, Math.max(currentPage + 4, 10));
    const minPage = Math.max(1, Math.min(currentPage - 5, totalPageNumber - 9));
    const pagesBtns: JSX.Element[] = [];
    for (let page = minPage; page <= maxPage; ++page) {
        const newPageSearchParams = new URLSearchParams(searchParams);
        newPageSearchParams.set("page", page.toString());
        pagesBtns.push(
            <Link key={page} href={`${pathname}?${newPageSearchParams.toString()}`} className={clsx(["join-item btn",
                page === currentPage && "btn-active pointer-events-none"])}>{page}</Link>
        )
    }

    const prevPageSearchParams = new URLSearchParams(searchParams);
    prevPageSearchParams.set("page", (currentPage - 1).toString());

    const nextPageSearchParams = new URLSearchParams(searchParams);
    nextPageSearchParams.set("page", (currentPage + 1).toString());

    return (
        <>
            <div className="join max-sm:hidden my-4">{pagesBtns}</div>
            <div className="sm:hidden my-4">
                {currentPage > 1 && <Link href={`${pathname}?${prevPageSearchParams.toString()}`} className="join-item btn">«</Link>}
                <button className="join-item btn">Page {currentPage}</button>
                {currentPage < totalPageNumber && <Link href={`${pathname}?${nextPageSearchParams.toString()}`} className="join-item btn">»</Link>}
            </div>
        </>

    )
}