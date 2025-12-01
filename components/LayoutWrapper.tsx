"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Untuk halaman admin, tidak ada Navbar dan Footer desa
    return <>{children}</>;
  }

  // Untuk halaman publik, tampilkan Navbar dan Footer desa
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
