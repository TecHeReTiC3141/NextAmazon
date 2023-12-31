import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/app/ui/components/Header";
import Footer from "@/app/ui/components/Footer";
import Head from "next/head";
import SessionProvider from "@/app/ui/components/SessionProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
        template: '%s | NextAmazon',
        default: "NextAmazon",
    },
    description: 'We make your wallets cry',
}

// TODO: add progress bar
export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + "min-h-screen"}>
            <SessionProvider>
                <Header/>
                <main className="px-4  max-w-7xl min-w-[25rem] m-auto">
                    {children}
                </main>
                <Footer/>
            </SessionProvider>
        </body>
        </html>
    )
}
