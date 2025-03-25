import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import "reflect-metadata";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Photo Album App",
    description: "Share and Love with Care",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-black">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
            >
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{ duration: 3000 }}
                />
                {children}
            </body>
        </html>
    );
}
