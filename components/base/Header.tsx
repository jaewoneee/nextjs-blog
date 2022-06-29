import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1>
        <Link href="/">
          <a>ONEDAY</a>
        </Link>
      </h1>
      <Link href="/post/add">
        <a>+</a>
      </Link>
    </header>
  );
}
