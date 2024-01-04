"use client"

import {CartItemWithProduct} from "@/app/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import formatPrice from "@/app/lib/utils/formatPrice";
import SubmitBtn from "@/app/ui/components/SubmitBtn";
import React, {useState} from "react";
import clsx from "clsx";
import {FaXmark} from "react-icons/fa6";

interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>,
}

// TODO: implement Reset button + solve problem with onClick
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

                    <form action={handleSubmit} className="flex gap-2 items-center">
                        <label htmlFor="quantity" className="mr-4">Quantity:</label>

                        <input type="number" name="quantity" id="quantity" max={99} min={0}
                               className="input input-ghost w-16 px-2 h-8"
                               defaultValue={quantity} onChange={ev => {
                            if (!ev.target.parentElement) return;
                            const updateBtn = ev.target.parentElement.querySelector('button[type="submit"]'),
                            resetBtn = ev.target.parentElement.querySelector('button#reset-btn');
                            if (!updateBtn || !resetBtn) return;
                            if (+ev.target.value !== quantity) {
                                updateBtn.removeAttribute("disabled");
                                resetBtn.removeAttribute("disabled");
                            } else {
                                updateBtn.setAttribute("disabled", "");
                                resetBtn.setAttribute("disabled", "");
                            }
                            if (+ev.target.value === 0) {
                                setUpdateMode("remove");
                            } else {
                                setUpdateMode("update");
                            }
                        }}/>
                        <SubmitBtn disabled={true}
                                   className={clsx(["max-h-4 btn-sm", updateMode == "remove" ? "btn-warning" : "btn-primary"])}>
                            {updateMode[0].toUpperCase() + updateMode.slice(1)}</SubmitBtn>
                        <button id="reset-btn" className="btn btn-ghost btn-sm" disabled={true} onClick={ev => {
                            ev.preventDefault();
                            console.log("reset clicked");
                            const form = ev.currentTarget.parentElement;
                            if (!form) return;
                            const quantityInput = form.querySelector("#quantity") as HTMLInputElement;
                            if (!quantityInput) return;
                            quantityInput.value = quantity.toString();
                        }}>
                            <FaXmark className="text-red-400 text-lg"/>
                        </button>
                    </form>

                    <p>Total: {formatPrice(product.price * quantity)}</p>

                </div>
            </div>

            <div className="divider"></div>

        </div>
    )
}