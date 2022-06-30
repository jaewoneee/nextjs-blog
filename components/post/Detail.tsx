import Image from "next/image";
import styles from "./Detail.module.css";

export default function PostDetail() {
  return (
    <div id={styles.detail}>
      <div className={styles.inner}>
        <h2>title</h2>
        <div className={styles.imageBox}>
          <Image
            src="/test2.jpeg"
            layout="fill"
            objectFit="contain"
            alt="thumbnail"
          />
        </div>
        <p>세상은 호락호락하지 않다 괜찮다 나도 호락호락하지 않으니깐</p>
      </div>
    </div>
  );
}
