import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProvider from "@/context/userProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Home | WORK MANAGER",
//   description: "A simple task management app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          <ToastContainer position="top-right" autoClose={3000} />
          <UserProvider>
            <Navbar />
            <main className="pt-16 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
              {children}
            </main>
            <Footer />
          </UserProvider>
        </>
      </body>
    </html>
  );
}
