import prisma from "@/app/lib/db/prisma";
import {cookies} from "next/headers";
import {Prisma} from "@prisma/client";

export type ShoppingCartWithProduct = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } }
}>;

export type ShoppingCart = ShoppingCartWithProduct & {
    size: Number,
    subtotal: Number,
}

export async function getCart(): Promise<ShoppingCart | null>  {
    const localCartId = cookies().get("localCartId")?.value;
    const cart = localCartId ? await prisma.cart.findUnique({
        where: {id: localCartId,},
        include: {items: {include: {product: true}}}
    }) : null;
    if (!cart) return null;
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    };
}

export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
        data: {},
    });

    // TODO: add encryption and secure setting in deployment app
    cookies().set("localCartId", newCart.id);
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}