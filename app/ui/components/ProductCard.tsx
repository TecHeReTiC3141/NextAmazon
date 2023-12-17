import {Product} from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/app/lib/utils/formatPrice";

interface ProductCardProps {
    product: Product
}


export default function ProductCard({product}: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <Image src={product.imageUrl} alt={product.name} width={700} height={400}></Image>
                <p>{product.description}</p>
                <p>{formatPrice(product.price)}</p>
            </div>
        </Link>
    )
}