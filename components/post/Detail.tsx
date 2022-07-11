import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./Detail.module.css";

// const GET_POSTITEM = gql`
//   query{
//     posts{

//     }
//   }
// `;

export default function PostDetail() {
  const { query } = useRouter();

  useEffect(() => {
    console.log(query);
  }, []);

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
        <div className={styles.buttonBox}>
          <Link href="/list">
            <a>List</a>
          </Link>
          <div>
            <button>edit</button>
            <button>delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
