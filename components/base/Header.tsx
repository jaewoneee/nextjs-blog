import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header id={styles.header}>
      <h1>
        <Link href="/">
          <a id={styles.logo}>
            ONE
            <br />
            DAY
          </a>
        </Link>
      </h1>
      <Link href="/post/add">
        <a className={styles.addBtn}>+</a>
      </Link>
    </header>
  );
}
