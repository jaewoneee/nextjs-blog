import Image from "next/image";
import Link from "next/link";
import styles from "./List.module.css";

export default function PostList() {
  return (
    <ul>
      <li>
        <Link href="/post/123">
          <a className={styles.postItem}>
            <Image
              src="/test.jpeg"
              objectFit="cover"
              width="400"
              height="250"
              alt="thumbnail"
            />
            <span className={styles.postInfoBox}>
              <span className={styles.date}>22.11.11</span>
              <span className={styles.title}>아니 근데 솔직히 진짜</span>
              <span className={styles.summary}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas eleifend est massa, et dictum odio tempus et. Fusce sit
                amet ex dapibus, dictum lectus in, finibus ante. Proin eget mi
                id eros vulputate pulvinar a vel lorem. Ut diam nibh, ultricies
                eget scelerisque non, sagittis nec tortor. Curabitur ut
                fermentum sem. Fusce eu mattis quam, sit amet vehicula ante.
                Mauris sagittis tincidunt tincidunt. Nullam nisl justo, dictum
                quis sollicitudin sed, venenatis quis ante. Sed eleifend
                elementum libero et aliquet. Sed rhoncus faucibus ipsum, quis
                malesuada leo ullamcorper eu. Nullam varius gravida ipsum sit
                amet consequat. Nam neque libero, pellentesque nec blandit quis,
                egestas quis erat. Phasellus hendrerit suscipit mollis. Quisque
                nec luctus nisi.
              </span>
            </span>
          </a>
        </Link>
      </li>
    </ul>
  );
}
