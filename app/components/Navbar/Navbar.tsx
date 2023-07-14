import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={100} height={40}></Image>
      </Link>
      <ul>
        <li>
          <Link href="/">Explore</Link>
        </li>
      </ul>
    </nav>
  );
};
