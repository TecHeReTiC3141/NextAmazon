import prisma from "@/app/lib/db/prisma";
import {cookies} from "next/headers";
import {Cart, Prisma} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export type ShoppingCartWithProduct = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } }
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true },
}>

export type ShoppingCart = ShoppingCartWithProduct & {
    size: number,
    subtotal: number,
}

export async function getCart(): Promise<ShoppingCart | null> {

    const session = await getServerSession(authOptions);
    let cart: ShoppingCartWithProduct | null;

    if (session) {
        cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
            include: {
                items:
                    {include: {product: true}}
            },
        });
    } else {
        const localCartId = cookies().get("localCartId")?.value;

        cart = localCartId ? await prisma.cart.findUnique({
            where: {id: localCartId,},
            include: {
                items:
                    {include: {product: true}}
            }
        }) : null;
    }
    if (!cart) return null;
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    };
}

export async function createCart(): Promise<ShoppingCart> {
    const session = await getServerSession(authOptions);

    let cart: Cart;

    if (session) {
        cart = await prisma.cart.create({
            data: {userId: session.user.id},
        });
    } else {

        cart = await prisma.cart.create({
            data: {},
        });
        cookies().set("localCartId", cart.id);
    }

    // TODO: add encryption and secure setting in deployment app
    return {
        ...cart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}