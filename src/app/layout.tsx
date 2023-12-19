import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/(header)/Header';
import { AuthProvider } from '@/provider';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Tasks',
    description: 'Tasks',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <AuthProvider>
                <body className={poppins.className}>
                    <Header />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
}
