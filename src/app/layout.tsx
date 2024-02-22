import type { Metadata } from "next";
import "./globals.css";
import FloatingBtn from "@/components/FloatingBtn";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});
export const metadata: Metadata = {
  title: "Moto Shop",
  description: "Buy Motos, Gear and much more here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rajdhani.variable}>
      <CartProvider>
          <Navbar/>
          {children}
          <Toaster />
          <Footer />
          <FloatingBtn />
        </CartProvider>
      </body>
    </html>
  );
}
