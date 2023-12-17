import {Product} from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/app/lib/utils/formatPrice";
import PriceTag from "@/app/ui/components/PriceTag";

interface ProductCardProps {
    product: Product
}


export default function ProductCard({product}: ProductCardProps) {
    const isNew = Date.now() - new Date(product.createdAt).getTime() <= 7 * 86400 * 1000;
    return (
        <Link href={`/products/${product.id}`} className="card w-full bg-base-100 hover:shadow-xl transition-shadow">
            <figure>
                <Image src={product.imageUrl}
                       alt={product.name}
                       width={800}
                       height={400}
                className="object-cover h-48"></Image>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                {isNew && <h2 className="badge badge-secondary">NEW</h2>}
                <p>{product.description}</p>
                <PriceTag price={product.price} />
            </div>
        </Link>
    )
}