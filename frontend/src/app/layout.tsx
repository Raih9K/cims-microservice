import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import "flatpickr/dist/flatpickr.css";
import { Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${outfit.className} dark:bg-gray-900 overflow-x-hidden max-w-full`}>
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <SidebarProvider>{children}</SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
