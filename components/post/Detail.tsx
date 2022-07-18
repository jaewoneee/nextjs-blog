import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

// 페이지 id(쿼리스트링)에 해당하는 포스트 가져오기
const GET_POST = gql`
  query GetPostItem($id: String!) {
    posts(id: $id) {
      id
      date
      title
      content
    }
  }
`;

const REMOVE_POST = gql`
  mutation RemovePost($id: String!) {
    removePost(id: $id) {
      id
    }
  }
`;

export default function PostDetail() {
  const { query } = useRouter();
  const id = query.id;
  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery(GET_POST, {
    variables: { id },
  });
  const [post] = data ? data.posts : [];
  const [isEditable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(post?.title);
  const [newContent, setNewContent] = useState(post?.content);
  const [removePost] = useMutation(REMOVE_POST);

  const handleRemove = () => {
    removePost({
      variables: { id },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: "Post" });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
    Router.push("/list");
  };

  const handleUpdate = () => {
    cache.writeFragment({
      id: `Post:${id}`,
      fragment: gql`
        fragment UpdatePost on Post {
          title
          content
        }
      `,
      data: {
        title: newTitle,
        content: newContent,
      },
    });

    Router.push("/list");
  };

  return (
    <div id={styles.detail}>
      <div className={styles.inner}>
        {!isEditable ? (
          <h2>{post?.title}</h2>
        ) : (
          <input
            defaultValue={post?.title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        )}
        <div className={styles.imageBox}>
          <Image
            src="/test2.jpeg"
            layout="fill"
            objectFit="contain"
            alt="thumbnail"
          />
        </div>
        {!isEditable ? (
          <p>{post?.content}</p>
        ) : (
          <textarea
            className={styles.textBox}
            defaultValue={post?.content}
            onChange={(e) => setNewContent(e.target.value)}
          />
        )}
        <div className={styles.buttonBox}>
          <div>
            <button
              onClick={
                isEditable ? handleUpdate : () => setEditable((state) => !state)
              }
            >
              {isEditable ? "Complete" : "Edit"}
            </button>
            <button onClick={handleRemove}>delete</button>
          </div>
          <Link href="/list">
            <a>List</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
