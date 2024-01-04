import prisma from "@/app/lib/db/prisma";
import ProductsGrid from "@/app/ui/components/ProductsGrid";
import {HERO_ITEM_COUNT as heroItemCount, PAGE_COUNT as pageSize} from "@/app/lib/gripParams";

interface HomeProps {
    searchParams: { page: string }
}

export default async function Home({searchParams: {page = "1"}}: HomeProps) {
    const currentPage = +page;

    const productCount = await prisma.product.count();

    const pageCount = Math.ceil((productCount - heroItemCount) / pageSize);

    const products = await prisma.product.findMany({
        orderBy: {id: "desc"},
        skip: (currentPage - 1) * pageSize + Number(currentPage === 1 && heroItemCount),
        take: pageSize + Number(currentPage === 1 && heroItemCount),
    });

    return (
        <ProductsGrid currentPage={currentPage} pageCount={pageCount} products={products} />
    );
}
