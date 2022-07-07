import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./List.module.css";

type PostTypes = {
  id: string;
  date: string;
  title: string;
  content: string;
};

const Q_POSTLIST = gql`
  query {
    post {
      id
      date
      title
      content
    }
  }
`;

export default function PostList() {
  const { loading, error, data } = useQuery(Q_POSTLIST);
  const posts = data ? data.post : [];

  return (
    <ul id={styles.list}>
      {posts.map((v: PostTypes) => (
        <li className={styles.postItem} key={v.id}>
          <Link href={`/post/${v.id}`}>
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
