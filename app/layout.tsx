import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/app/ui/components/Header";
import Footer from "@/app/ui/components/Footer";
import Head from "next/head";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
        template: '%s | NextAmazon',
        default: "NextAmazon",
    },
    description: 'We make your wallets cry',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <Head>
                <script src="https://kit.fontawesome.com/c9b4448de0.js" crossOrigin="anonymous"></script>
            </Head>
            <body className={inter.className}>
                <Header />
                <main className="px-4 min-h-screen max-w-7xl min-w-[25rem] m-auto">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
