import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/app/ui/components/Header";

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
            <body className={inter.className}>
                <Header />
                <main className="px-4 min-h-screen max-w-7xl min-w-[25rem] m-auto">
                    {children}
                </main>
            </body>
        </html>
    )
}
