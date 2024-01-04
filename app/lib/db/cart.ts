import prisma from "@/app/lib/db/prisma";
import {cookies} from "next/headers";
import {Cart, CartItem, Prisma} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/configs/authOptions";

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

export async function mergeAnonymousCartIntoUsersCart(userId: string) {
    const localCartId = cookies().get("localCartId")?.value;

    const localCart = localCartId ? await prisma.cart.findUnique({
        where: {id: localCartId,},
        include: {items: true,}
    }) : null;

    if (!localCart) return;

    const userCart = await prisma.cart.findFirst({
        where: {userId},
        include: {items: true},
    });


    await prisma.$transaction(async tx => {
        if (userCart) {
            const mergedItems = mergeCartItems(localCart.items, userCart.items);

            await tx.cartItem.deleteMany({
                where: {cartId: userCart.id},
            });

            await tx.cart.update({
                where: {id: userCart.id},
                data: {
                    items: {
                        createMany: {
                            data: mergedItems.map(item => ({
                                quantity: item.quantity,
                                productId: item.productId,
                            }))
                        }
                    }
                }
            })

        } else {
            await tx.cart.create({
                data: {
                    userId,
                    items: {
                        createMany: {
                            data: localCart.items.map(
                                ({id, cartId, ...item}) => item
                            ),
                        }
                    }
                },
            });
        }

        await tx.cart.delete({where: {id: localCartId}});
        cookies().set("localCartId", "");
    });

}

function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
    return cartItems.reduce((acc, items) => {
        items.forEach(item => {
            const existingItem = acc.find(it2 => it2.productId === item.productId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
        });
        return acc;
    }, [] as CartItem[]);
}