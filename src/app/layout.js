// app/layout.js
"use client"; // クライアントコンポーネントとしてマーク

import localFont from "next/font/local";
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./globals.css";
import TransitionEffect from '../components/TransitionEffect';
import useLenis from '../hooks/Lenis'; // useLenisフックをインポート

export const viewport = {
    width: 'device-width',
    initialScale: 1.0
};

export default function RootLayout({ children }) {
    useLenis(); // Lenisを使用

    return (
        <html lang="ja">
            <body>
                <Header />
                {children}
                <Footer />
                <TransitionEffect />
            </body>
        </html>
    );
}
