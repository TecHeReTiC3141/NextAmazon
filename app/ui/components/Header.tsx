import Link from "next/link";
import ThemeSwitcher from "@/app/ui/components/ThemeSwitcher";
import logo from "@/app/assets/images/logo.png";
import Image from "next/image";
import {redirect} from "next/navigation";
import ShoppingCartButton from "@/app/ui/components/ShoppingCartButton";
import {getCart} from "@/app/lib/db/cart";
import UserMenuButton from "@/app/ui/components/UserMenuButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/lib/configs/authOptions";

async function searchProducts(formData: FormData) {
    "use server"

    const query = formData.get("searchQuery")?.toString();
    if (query) {
        redirect(`/search?query=${query}`);
    }
}

export default async function Header() {

    const cart = await getCart();
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-primary">

            <header className="navbar m-auto max-w-7xl py-2 px-5 rounded-md mb-4 sticky top-0 z-10 max-lg:flex-col justify-between items-center">

                <nav className="flex gap-4 flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        <Image src={logo} alt="NextAmazon" width={40} />
                        NextAmazon
                    </Link>
                    <Link href="/add-product">Add product</Link>
                </nav>
                <div className="flex-none flex gap-4">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input type="text"
                                   name="searchQuery"
                                   id="searchQuery"
                                   placeholder="Search"
                                   className="input input-bordered min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                    <ThemeSwitcher />
                </div>

            </header>
        </div>
    )
}