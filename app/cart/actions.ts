"use server"

import {createCart, getCart} from "@/app/lib/db/cart";
import prisma from "@/app/lib/db/prisma";
import {revalidatePath} from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find(item => item.productId === productId);

    if (quantity === 0 && articleInCart) {
        await prisma.cartItem.delete({
            where: {id: articleInCart.id}
        });
    } else if (quantity !== 0 && articleInCart) {
        await prisma.cartItem.update({
                where: {id: articleInCart.id},
                data: {quantity,},
            },
        );
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            }
        });
    }
    revalidatePath("/cart");
}