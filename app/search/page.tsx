import prisma from "@/app/lib/db/prisma";
import ProductsGrid from "@/app/ui/components/ProductsGrid";
import {HERO_ITEM_COUNT as heroItemCount, PAGE_COUNT as pageSize} from "@/app/lib/gripParams";


interface SearchPageProps {
    searchParams: { query: string, page: string },
}

export default async function SearchPage({searchParams: {query, page = "1"}}: SearchPageProps) {


    const currentPage = +page;

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {name: {contains: query, mode: "insensitive"}},
                {description: {contains: query, mode: "insensitive"}}
            ]
        },
        orderBy: {id: "desc"},
        skip: (currentPage - 1) * pageSize,
        take: pageSize + Number(currentPage === 1 && heroItemCount),
    });
    const productCount = await prisma.product.count({
        where: {
            OR: [
                {name: {contains: query, mode: "insensitive"}},
                {description: {contains: query, mode: "insensitive"}}
            ]
        }
    });
    const pageCount = Math.ceil((productCount - heroItemCount) / pageSize);

    if (!products) {
        return <div className="text-center text-xl">No products found</div>
    }
    return (
        <ProductsGrid products={products} currentPage={currentPage} pageCount={pageCount}/>
    )

}