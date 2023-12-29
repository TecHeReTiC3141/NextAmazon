import Link from "next/link";
import ThemeSwitcher from "@/app/ui/components/ThemeSwitcher";
import logo from "@/app/assets/images/logo.png";
import Image from "next/image";
import {redirect} from "next/navigation";

async function searchProducts(formData: FormData) {
    "use server"

    const query = formData.get("searchQuery")?.toString();
    if (query) {
        redirect(`/search?query=${query}`);
    }
}

export default function Header() {
    return (
        <div className="bg-base-100">

            <header className="navbar m-auto max-w-7xl py-2 px-5 rounded-md mb-4 sticky top-0 z-10 justify-between items-center">

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
                    <ThemeSwitcher />
                </div>

            </header>
        </div>
    )
}