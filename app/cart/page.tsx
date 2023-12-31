import {Metadata} from "next";
import {getCart} from "@/app/lib/db/cart";
import CartEntry from "@/app/cart/CartEntry";
import {setProductQuantity} from "@/app/cart/actions";
import formatPrice from "@/app/lib/utils/formatPrice";

export const metadata: Metadata = {
    title: "Your cart",
}

export default async function CartPage() {
    const cart = await getCart();

    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-8">Your shopping cart</h2>
            {cart?.items.length ? cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            )) : <h3 className="text-2xl">Your cart is empty</h3>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">Total price: {formatPrice(cart?.subtotal || 0)}</p>
                <button className="uppercase btn btn-primary sm:w-60">Checkout</button>
            </div>
        </div>
    );
}