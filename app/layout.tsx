import "./styles/glolbals.css";
import "./styles/reset.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Bear application",
  description: "Choose the best bears of the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Navbar />
        <main className={styles.layout}>{children}</main>
      </body>
    </html>
  );
}
