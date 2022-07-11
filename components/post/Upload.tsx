/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import styles from "./Upload.module.css";

const M_CREATE = gql`
  mutation CreatePost($date: String!, $title: String!, $content: String!) {
    createPost(date: $date, title: $title, content: $content) {
      id
      date
      title
      content
    }
  }
`;

export default function PostUpload() {
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createPost, { data, loading, error }] = useMutation(M_CREATE, {
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPost = cache.writeFragment({
              data: createPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  type
                }
              `,
            });
            return [...existingPosts, newPost];
          },
        },
      });
    },
  });

  const clickHandler = () => {
    createPost({
      variables: {
        date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
        title,
        content,
      },
    });
    Router.push("/list");
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setSrc(reader.result as string);
        resolve();
      };
    });
  };

  return (
    <div id={styles.upload}>
      <div className={styles.fileUploadBox}>
        {!src ? (
          <>
            <input
              type="file"
              id="file-upload"
              accept="image/jpeg,image/jpg,image/gif,image/png"
              onChange={(e) =>
                e.target.files && encodeFileToBase64(e.target.files[0])
              }
            />
            <label htmlFor="file-upload">
              <span>Upload Image</span>
            </label>
          </>
        ) : (
          <div className={styles.imageBox} onClick={() => setSrc("")}>
            <Image
              src={src}
              alt="thumbnail"
              objectFit="contain"
              layout="fill"
            />
          </div>
        )}
      </div>
      <div className={styles.textUploadBox}>
        <input
          type="text"
          placeholder="제목을 입력해 주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="내용을 입력해 주세요"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className={styles.buttonRow}>
          <button type="button" onClick={clickHandler}>
            등록하기
          </button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
}
