import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-dm-sans',
});

export const metadata: Metadata = {
    title: 'The Transurfing Mirror',
    description: 'An Experiential Reality Management Platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${cormorant.variable} ${dmSans.variable} font-dm-sans antialiased overflow-x-hidden`}>
                {children}
            </body>
        </html>
    );
}
