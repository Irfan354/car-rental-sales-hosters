"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import "./globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // hide navbar for auth routes
  const hideNavbar = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body>
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
