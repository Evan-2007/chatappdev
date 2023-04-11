'use client';
import './globals.css'

import { SessionProvider } from 'next-auth/react';

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head></head>
            <body>
                <SessionProvider refetchOnWindowFocus={false}>
                        <>{children}</>
                </SessionProvider>
            </body>
        </html>
    );
}

export default RootLayout;