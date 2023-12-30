"use client"

import {CartItemWithProduct} from "@/app/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import formatPrice from "@/app/lib/utils/formatPrice";

interface CartEntryProps {
    cartItem: CartItemWithProduct,
}

export default async function CartEntry({cartItem: {product, quantity}}: CartEntryProps) {
    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg"/>
                <div>
                    <Link href={`/products/${product.id}`} >{product.name}</Link>
                    <p>Price: {formatPrice(product.price)}</p>

                    <label htmlFor="quantity" className="mr-4">Quantity:</label>
                    <input type="number" name="quantity" id="quantity" max={99} min={1} className="input input-ghost w-16 px-2 h-8"
                           defaultValue={quantity} onChange={e => {

                    }}/>

                    <p>Total: {formatPrice(product.price * quantity)}</p>

                </div>
            </div>

            <div className="divider"></div>

        </div>
    )
}