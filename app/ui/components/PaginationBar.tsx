import type {JSX} from "react";
import Link from "next/link";
import clsx from "clsx";

interface PaginationBarProps {
    currentPage: number,
    totalPageNumber: number,
}

export default function PaginationBar({currentPage, totalPageNumber}: PaginationBarProps) {
    const maxPage = Math.min(totalPageNumber, Math.max(currentPage + 4, 10));
    const minPage = Math.max(1, Math.min(currentPage - 5, totalPageNumber - 9));
    const pagesBtns: JSX.Element[] = [];
    for (let page = minPage; page <= maxPage; ++page) {
        pagesBtns.push(
            <Link key={page} href={`/?page=${page}`} className={clsx(["join-item btn",
                page === currentPage && "btn-active pointer-events-none"])}>{page}</Link>
        )
    }

    return (
        <>
            <div className="join max-sm:hidden">
                {pagesBtns}
            </div>
            <div className="sm:hidden ">
                {currentPage > 1 && <Link href={`/?page=${currentPage - 1}`} className="join-item btn">«</Link>}
                <button className="join-item btn">Page {currentPage}</button>
                {currentPage < totalPageNumber && <Link href={`/?page=${currentPage + 1}`} className="join-item btn">»</Link>}
            </div>
        </>

    )
}