import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Desa Tababo Selatan",
  description: "Admin panel untuk mengelola website Desa Tababo Selatan",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
