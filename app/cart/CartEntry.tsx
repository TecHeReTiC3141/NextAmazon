"use client"

import {CartItemWithProduct} from "@/app/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import formatPrice from "@/app/lib/utils/formatPrice";
import {useFormStatus} from "react-dom";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import {useState} from "react";
import clsx from "clsx";

interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>,
}

export default function CartEntry({cartItem: {product, quantity}, setProductQuantity}: CartEntryProps) {
    const [updateMode, setUpdateMode] = useState("update");

    async function handleSubmit(formData: FormData) {
        // TODO: disable update button after update
        const newQuantity = formData.get("quantity");
        if (newQuantity) {
            await setProductQuantity(product.id, +newQuantity);
        }
    }


    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg"/>
                <div>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                    <p>Price: {formatPrice(product.price)}</p>

                    <form action={handleSubmit}>
                        <label htmlFor="quantity" className="mr-4">Quantity:</label>

                        <input type="number" name="quantity" id="quantity" max={99} min={0}
                               className="input input-ghost w-16 px-2 h-8"
                               defaultValue={quantity} onChange={ev => {
                            if (!ev.target.parentElement) {
                                return;
                            }
                            const button = ev.target.parentElement.querySelector('button[type="submit"]');
                            if (!button) return;
                            if (+ev.target.value !== quantity) {
                                console.log("value changed");
                                button.removeAttribute("disabled");
                            } else {
                                button.setAttribute("disabled", "");
                            }
                            if (+ev.target.value === 0) {
                                setUpdateMode("remove");
                            } else {
                                setUpdateMode("update");
                            }
                        }}/>
                        <SubmitBtn disabled={true} className={clsx(["max-h-4 ml-4", updateMode == "remove" ? "btn-warning" : "btn-primary"])}>
                            {updateMode[0].toUpperCase() + updateMode.slice(1)}</SubmitBtn>

                    </form>

                    <p>Total: {formatPrice(product.price * quantity)}</p>

                </div>
            </div>

            <div className="divider"></div>

        </div>
    )
}