import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/app/ui/components/Header";
import Footer from "@/app/ui/components/Footer";
import SessionProvider from "@/app/ui/components/SessionProvider";
import {ProgressBar} from "@/app/ui/components/auth/ProgressBar";

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
        <body className={inter.className + "min-h-screen"}>
            <SessionProvider>
                <Header/>
                <main className="px-4  max-w-7xl min-w-[25rem] m-auto">
                    {children}
                </main>
                <Footer/>
                <ProgressBar
                    height="4px"
                    color="#07cae3"
                    options={{ showSpinner: true }}
                    shallowRouting
                />
            </SessionProvider>
        </body>
        </html>
    )
}
