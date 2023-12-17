import Link from "next/link";
import ThemeSwitcher from "@/app/ui/components/ThemeSwitcher";

export default function Header() {
    return (
        <header className="w-full bg-primary py-4 px-3 rounded-md mb-4 sticky top-0 z-10 flex justify-between items-center">
            <nav className="flex gap-4">

                <Link href="/">Home</Link>
                <Link href="/add-product">Add product</Link>
            </nav>
            <ThemeSwitcher />

        </header>
    )
}