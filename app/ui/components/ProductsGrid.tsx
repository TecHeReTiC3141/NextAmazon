import ProductCard from "@/app/ui/components/ProductCard";
import PaginationBar from "@/app/ui/components/PaginationBar";
import {Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsGridProps {
    products: Product[],
    currentPage: number,
    pageCount: number,
}

export default function ProductsGrid({products, currentPage, pageCount}: ProductsGridProps) {
    return (
        <div className="flex flex-col items-center">

            {currentPage === 1 && <div className="hero rounded-md bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <Image
                        src={products[0].imageUrl}
                        alt={products[0].name}
                        width={400}
                        height={200}
                        className="w-full max-w-sm rounded-xl shadow-2xl"
                        priority
                    />
                    <div>
                        <h1 className="text-5xl font-bold">{products[0].name}</h1>
                        <p className="py-6">{products[0].description}</p>
                        <Link
                            href={`/products/${products[0].id}`}
                            className="btn btn-primary uppercase"
                        >
                            Check it out
                        </Link>
                    </div>
                </div>
            </div>}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(currentPage === 1 ? products.slice(1) : products).map((prod) => (
                    <ProductCard product={prod} key={prod.id}/>
                ))}
            </div>
            {pageCount > 1 &&
                <PaginationBar currentPage={currentPage} totalPageNumber={pageCount}/>
            }
        </div>
    )
}