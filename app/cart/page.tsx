import {Metadata} from "next";
import {getCart} from "@/app/lib/db/cart";
import CartEntry from "@/app/cart/CartEntry";
import {setProductQuantity} from "@/app/cart/actions";

export const metadata: Metadata = {
    title: "Your cart",
}

export default async function CartPage() {
    const cart = await getCart();

    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-8">Your shopping cart</h2>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
        </div>
    );
}