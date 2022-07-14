import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { PostTypes } from "../../pages/api/schema";
import styles from "./List.module.css";

// 포스트 리스트 모두 가져오기

const Q_POSTLIST = gql`
  query {
    posts {
      id
      date
      title
      content
    }
  }
`;

export default function PostList() {
  const { loading, error, data } = useQuery(Q_POSTLIST);
  const posts = data ? data.posts : [];

  return (
    <ul id={styles.list}>
      {posts.map((v: PostTypes) => (
        <li className={styles.postItem} key={v.id}>
          <Link href={{ pathname: "/post", query: { id: v.id } }}>
            <a>
              <span className={styles.imageBox}>
                <Image
                  src="/test.jpeg"
                  objectFit="cover"
                  layout="fill"
                  alt="thumbnail"
                />
              </span>

              <span className={styles.postInfoBox}>
                <span className={styles.date}>{v.date}</span>
                <span className={styles.title}>{v.title}</span>
                <span className={styles.summary}>{v.content}</span>
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
