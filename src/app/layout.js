import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
    viewport: "width=device-width, initial-scale=1.0"
};

export default function RootLayout({ children }) {
    return (
        <html lang="ja">
            <body>
                {children}
            </body>
        </html>
    );
}