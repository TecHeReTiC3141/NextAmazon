"use server"

import {createCart, getCart} from "@/app/lib/db/cart";

export async function setProductQuantity(productId: string, quantity: number) {
    const cart = (await getCart()) ?? (await createCart());

}