import prisma from "@/app/lib/db/prisma";
import {notFound} from "next/navigation";
import Image from "next/image";
import PriceTag from "@/app/ui/components/PriceTag";
import {Metadata} from "next";
import {cache, Suspense} from "react";
import AddToCartButton from "@/app/products/[id]/AddToCartButton";
import { incrementProductQuantity } from "@/app/products/[id]/actions";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: {id}});
    if (!product) {
        notFound();
    }
    return product;

})

export async function generateMetadata({params: {id},}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            images: [
                { url: product.imageUrl, }
            ]
        }
    }

}

export default async function ProductPage({
                                              params: {id},
                                          }: ProductPageProps) {

    const product = await getProduct(id);

    return (
        <div className="flex flex-col items-center lg:flex-row gap-6">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />

            <div>
                <h2 className="text-5xl font-bold">{product.name}</h2>
                <PriceTag price={product.price} className="mt-4"/>
                <p className="py-6">{product.description}</p>
                <Suspense fallback={<button className="btn btn-primary">Adding...<span className="loading loading-md loading-spinner"></span></button>}>
                    <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
                </Suspense>
            </div>

        </div>
    );
}
