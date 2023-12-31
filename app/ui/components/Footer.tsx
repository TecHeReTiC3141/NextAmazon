import {FaDiscord, FaYoutube, FaTelegram} from "react-icons/fa6";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png"

export default function Footer() {
    return (
        <footer className="footer footer-center mt-4 p-10 bg-primary text-primary-content">
            <aside>
                <Image src={logo} alt="NextAmazon" width={50} />
                <p className="font-bold">
                    NextAmazon <br/>by TecHeReTiC with dedication
                </p>
                <p>Copyright © {new Date().getFullYear()}</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <FaDiscord className="w-6 h-6"/>
                    <FaYoutube className="w-6 h-6"/>
                    <FaTelegram className="w-6 h-6"/>
                </div>
            </nav>
        </footer>
    )
}